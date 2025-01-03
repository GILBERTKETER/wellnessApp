import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Text, TextInput, Surface } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../App';
import { checkInternetConnection, checkAPIReachability } from '../../utils/networkUtils';
import { loginUser } from '../../api/api';
import EncryptedStorage from 'react-native-encrypted-storage';

const { width } = Dimensions.get('window');

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(true); // Track component mounting

    // Set up useEffect to track if the component is mounted
    useEffect(() => {
        return () => {
            setIsMounted(false); // Cleanup on unmount
        };
    }, []);

    const storeEncryptedCredentials = async (key: string, data: object) => {
        try {
            await EncryptedStorage.setItem(key, JSON.stringify(data));
            console.log('Encrypted data stored successfully');
        } catch (error) {
            console.error('Error storing encrypted data:', error);
        }
    };

    const openSignupPage = () => {
        navigation.navigate('Signup'); // Navigate to the Signup screen
    };

    const handleLogin = async () => {
        if (!email.trim() || !password.trim()) {
            if (isMounted) {
                Alert.alert("Validation Error", "Email and Password are required.");
            }
            return;
        }

        setIsLoading(true);

        try {
            const isConnected = await checkInternetConnection();
            if (!isConnected) {
                if (isMounted) {
                    Alert.alert("No Internet", "Please check your connection and try again.");
                }
                setIsLoading(false);
                return;
            }

            const apiBaseUrl = "http://192.168.42.215:3000";
            const isApiReachable = await checkAPIReachability(apiBaseUrl);
            if (!isApiReachable) {
                if (isMounted) {
                    Alert.alert("Server Unreachable", "Please try again later.");
                }
                setIsLoading(false);
                return;
            }

            const response = await loginUser(email, password);
            if (response?.status === "success" && response.data) {
                const { userId, accessToken, refreshToken } = response.data;

                // Save tokens securely
                await storeEncryptedCredentials('userCredentials', {
                    userId,
                    accessToken,
                    refreshToken,
                });

                if (isMounted) {
                    Alert.alert("Success", response.message);
                }
                // navigation.navigate("MainApp");
            } else {
                if (isMounted) {
                    Alert.alert("Error", response?.message || "An unexpected error occurred.");
                }
            }
        } catch (error) {
            if (isMounted) {
                Alert.alert("Error", error instanceof Error ? error.message : "An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const openResetPasswordPage = () => {
        // Navigate to reset password page
    };

    return (
        <View style={styles.container}>
            <Surface style={styles.card}>
                <Text style={styles.title}>Wellness App</Text>
                <Text style={styles.subtitle}>Sign in</Text>

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

                {/* Reset Password Link */}
                <Text style={styles.signupText}>
                    Forgot password? <Text style={styles.signupLink} onPress={openResetPasswordPage}>Reset password</Text>
                </Text>

                {/* Login Button */}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

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
                        <Text style={styles.modalText}>Logging you in. Please wait...</Text>
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
    },
    card: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1D2231',
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
        backgroundColor: '#1D2231',
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
    signupText: {
        marginTop: 15,
        color: '#555',
    },
    signupLink: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
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
