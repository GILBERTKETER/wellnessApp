import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking,
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
import {  registerUser } from '../../api/api';

const { width, height } = Dimensions.get('window');

type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
    const [lastName, setFName] = useState('');
    const [firstName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleSignup = async () => {
        if (!isChecked) {
            alert('You must accept the Terms and Conditions to proceed.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
    
        try {
            const response = await registerUser(email, password, firstName, lastName);
    
            const { status, message, data } = response;
    
            if (status === "success") {
                const { userId, accessToken, refreshToken } = data;
    
                console.log('User registered:', data);
    
                // Store tokens and navigate
                alert(message);
                navigation.navigate('MainApp');
            } else {
                alert(message || 'An unexpected error occurred.');
            }
        } catch (error) {
            const errorMessage =
                (error as Error).message || 'An unexpected error occurred.';
    
            if (errorMessage === 'User already exists') {
                alert(errorMessage);
            } else {
                alert('Registration failed: ' + errorMessage);
            }
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
});

export default SignupScreen;
