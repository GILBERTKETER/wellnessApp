import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking,
    Modal,
    ActivityIndicator,
    Alert,
} from 'react-native';
import {
    Text,
    TextInput,
    Button,
    Surface
} from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../App';
import { checkInternetConnection, checkAPIReachability } from '../../utils/networkUtils';
// Import the registerUser function from api.js
import { loginUser } from '../../api/api';

const { width, height } = Dimensions.get('window');

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
     const [isLoading, setIsLoading] = useState(false);


    const openSignupPage = () => {
        navigation.navigate('Signup'); // Navigate to the Signup screen
    };

    const handleLogin = async () => {
        // Implement login logic


            // Ensure fields are not empty
    if (!email.trim()) {
        Alert.alert("Validation Error", "Email is required.");
        return;
    }
    if (!password.trim()) {
        Alert.alert("Validation Error", "Password is required.");
        return;
    }
    
        setIsLoading(true);


            try {
                   // Check internet connection
                   const isConnected = await checkInternetConnection();
                   if (!isConnected) {
                       Alert.alert("No Internet", "Please check your internet connection and try again.");
                       setIsLoading(false);
                       return;
                   }
       
                   // Check API reachability
                   const apiBaseUrl = "http://192.168.42.215:3000"; // Replace with your actual API base URL
                   const isApiReachable = await checkAPIReachability(apiBaseUrl);
                   if (!isApiReachable) {
                       Alert.alert("Server Unreachable", "The server is currently unreachable. Please try again later.");
                       setIsLoading(false);
                       return;
                   }
       
                   const response = await loginUser(email, password );
                   if (response?.status === "success" && response.data) {
                       const { userId, accessToken, refreshToken } = response.data;
       
                       // Save tokens to AsyncStorage
                    //    await AsyncStorage.multiSet([
                    //        ["@accessToken", accessToken],
                    //        ["@refreshToken", refreshToken],
                    //        ["@userId", userId]
                    //    ]);
       
                       Alert.alert("Success", response.message);
                       navigation.navigate("MainApp");
                   } else {
                       Alert.alert("Error", response?.message || "An unexpected error occurred.");
                   }
               } catch (error) {
                   Alert.alert("Error", error instanceof Error ? error.message : "An unexpected error occurred.");
               } finally {
                   setIsLoading(false);
               }
    };


    const openResetPasswordPage = () => {
        //navigate to reset password page
    }


    return (
        <View style={styles.container}>

            <Surface style={styles.card}>

                <Text style={styles.title}>Wellness App</Text>
                <Text style={styles.subtitle}>
                    Sign in
                </Text>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Icon name="email" size={20} color="#888" />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>


                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#888" />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={secureTextEntry}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                        <Icon
                            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#6200EE"
                        />
                    </TouchableOpacity>
                </View>


                {/* Sign Up Link */}
                <Text style={styles.signupText}>
                    forgot password? <Text style={styles.signupLink} onPress={openResetPasswordPage}>Reset password</Text>
                </Text>

                {/* Login Button */}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* Divider */}
                <Text style={styles.divider}>Or sign in with</Text>


                {/* Social Login Buttons */}
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="apple" size={24} color="#000" />
                        <Text style={styles.socialText}>Apple</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="google" size={24} color="#EA4335" />
                        <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Icon name="facebook" size={24} color="#3b5998" />
                        <Text style={styles.socialText}>Facebook</Text>
                    </TouchableOpacity>
                </View>



                {/* Sign Up Link */}
                <Text style={styles.signupText}>
                    Don't have an account? <Text style={styles.signupLink} onPress={openSignupPage}>Sign Up</Text>
                </Text>

            </Surface>

              {/* Modal Loader */}
                            <Modal
                                transparent={true}
                                animationType="fade"
                                visible={isLoading}
                                onRequestClose={() => { }}
                            >
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <ActivityIndicator size="large" color="#0000ff" />
                                        <Text style={styles.modalText}>Logging you in Please wait...</Text>
                                    </View>
                                </View>
                            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // Replaced LinearGradient with solid background
    },
    card: {
        width: '100%', // Full width of the container
        height: '100%', // Full height of the container
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Optional: Add a background color for visibility
        borderRadius: 10, // Optional: Add rounded corners
        shadowColor: '#000', // Optional: Add a shadow
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // For Android shadow
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1D2231', //dark color
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        width: '100%',
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: '#fff',

    },
    button: {
        backgroundColor: '#1D2231', //dark color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    divider: {
        marginVertical: 15,
        color: '#888',
    }
    , socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center', // Center items in each row
        flexWrap: 'wrap', // Enable wrapping
        width: '100%',
        marginVertical: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#fff',
        margin: 5,
    },
    socialText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    signupText: {
        marginTop: 15,
        color: '#555',
    },
    signupLink: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
    // modal loader
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    
    },
    modalText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default LoginScreen;