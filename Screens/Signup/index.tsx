import React, { useState } from 'react'; 
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {
    Text,
    TextInput,
    Button,
    Surface
} from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../App';

const { width, height } = Dimensions.get('window');

type SignupScreenProps = StackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleSignup = () => {
        if (password !== confirmPassword) {
            // Show an alert or message about password mismatch
            alert('Passwords do not match');
            return;
        }
        // Implement your signup logic here (e.g., API request)
        navigation.navigate('MainApp'); // Navigate to the main app after signup
    };

    return (
        <View style={styles.container}>
            <Surface style={styles.card}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Icon name="account" size={20} color="#888" />
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={name}
                        onChangeText={setName}
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
                    Already have an account? <Text style={styles.signupLink} onPress={() => navigation.navigate('Login')}>Log In</Text>
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
        width: '90%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
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
