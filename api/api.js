import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: "https://our-server-url.com/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// intercept and add the bearer token
apiClient.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            console.error('Error retrieving token', error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common response scenarios
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle token expiration (401 status)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // refresh the token if it fails
                const newToken = await refreshAccessToken();
                await AsyncStorage.setItem('userToken', newToken);

                // Update the original request with new token
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                // If refresh fails, log out the user
                await AsyncStorage.removeItem('userToken');
                // redirect to login screen
                return Promise.reject(refreshError);
            }
        }

        // Handle other error scenarios
        return handleErrorResponse(error);
    }
);

// We adjsut based on our server
const refreshAccessToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await axios.post('https://our-server-url.com/refresh', {
            refreshToken
        });
        return response.data.accessToken;
    } catch (error) {
        throw error;
    }
};

// Centralized error handling
const handleErrorResponse = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        switch (error.response.status) {
            case 400:
                console.error('Bad Request:', error.response.data);
                break;
            case 403:
                console.error('Forbidden:', error.response.data);
                break;
            case 404:
                console.error('Not Found:', error.response.data);
                break;
            case 500:
                console.error('Server Error:', error.response.data);
                break;
            default:
                console.error('Unexpected Error:', error.response.data);
        }
    } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
    } else {
        // Something happened we setup the request
        console.error('Error setting up request:', error.message);
    }

    return Promise.reject(error);
};

// Generic API methods we can invoke and use directly
export const ApiService = {
    get: (endpoint, params = {}) => apiClient.get(endpoint, { params }),
    post: (endpoint, data = {}) => apiClient.post(endpoint, data),
    put: (endpoint, data = {}) => apiClient.put(endpoint, data),
    delete: (endpoint) => apiClient.delete(endpoint),
};

export default apiClient;