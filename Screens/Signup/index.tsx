import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking,
    Alert,
    ActivityIndicator,
    SafeAreaView,
    StatusBar,
    Platform,
    Modal,
} from 'react-native';
import {
    Text,
    TextInput,
    Button,
    Surface,
    Checkbox
} from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../App';
// Import the registerUser function from api.js
import { registerUser } from '../../api/api';

import { checkInternetConnection, checkAPIReachability } from '../../utils/networkUtils';

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');

type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
    const [lastName, setLName] = useState('');
    const [firstName, setFName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async () => {
        if (!isChecked) {
            Alert.alert("Terms and Conditions", "You must accept the Terms and Conditions to proceed.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match.");
            return;
        }

                   // Ensure fields are not empty
            if (!email.trim()) {
                Alert.alert("Validation Error", "Email is required.");
                return;
            }
            if (!password.trim()) {
                Alert.alert("Validation Error", "Password is required.");
                return;
            }
            if (!lastName.trim()) {
                Alert.alert("Validation Error", "Last name is required.");
                return;
            }
                if (!firstName.trim()) {
                    Alert.alert("Validation Error", "First name is required.");
                    return;
                }
                if (!confirmPassword.trim()) {
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

            const response = await registerUser(email, password, firstName, lastName);
            if (response?.status === "success" && response.data) {
                const { userId, accessToken, refreshToken } = response.data;

                // Save tokens to AsyncStorage
                // await AsyncStorage.multiSet([
                //     ["@accessToken", accessToken],
                //     ["@refreshToken", refreshToken],
                //     ["@userId", userId]
                // ]);

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














    const openLoginPage = () => {
        navigation.navigate('Login'); // Navigate to the Login screen
    };


    // Function to handle opening the Terms and Conditions link
    const openTermsAndConditions = () => {
        Linking.openURL('https://example.com/terms'); // Replace with your Terms URL
    };


    const [isChecked, setIsChecked] = useState(false);



    return (
        //  wraps the content with respect to status bar area
        //For android it is done dynamiccally while ios it automatic
        <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
            <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
            <View style={styles.container}>
                <Surface style={styles.card}>
                    <Text style={styles.title}>Wellness App</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>

                    {/* Name Input */}
                    <View style={styles.inputContainer}>
                        <Icon name="account" size={20} color="#888" />
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            value={firstName}
                            onChangeText={setFName}
                        />
                    </View>


                    <View style={styles.inputContainer}>
                        <Icon name="account" size={20} color="#888" />
                        <TextInput
                            style={styles.input}
                            placeholder="last Name"
                            value={lastName}
                            onChangeText={setLName}
                        />
                    </View>

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

                    {/* Confirm Password Input */}
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={20} color="#888" />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry={secureTextEntry}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                            <Icon
                                name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color="#6200EE"
                            />
                        </TouchableOpacity>
                    </View>


                    {/* Terms and Conditions */}
                    <View style={styles.termsContainer}>
                        <Checkbox status={isChecked ? 'checked' : 'unchecked'}
                            onPress={() => setIsChecked(!isChecked)} />
                        <Text style={styles.termsText}>
                            I accept the{' '}
                            <Text style={styles.link} onPress={openTermsAndConditions}>
                                Terms and Conditions
                            </Text>
                        </Text>
                    </View>



                    {/* Sign Up Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSignup}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <Text style={styles.divider}>Or sign up with</Text>

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

                    {/* Login Link */}
                    <Text style={styles.signupText}>
                        Already have an account? <Text style={styles.signupLink} onPress={openLoginPage}>Log In</Text>
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
                            <Text style={styles.modalText}>Please wait...</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    termsText: {
        marginLeft: 10,
        color: '#555',
    },
    link: {
        color: '#1E90FF',
        textDecorationLine: 'underline',
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
    divider: {
        marginVertical: 15,
        color: '#888',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
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

export default SignupScreen;
