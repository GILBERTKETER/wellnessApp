import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking,
    CheckBox
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

const { width, height } = Dimensions.get('window');

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const openSignupPage = () => {
        navigation.navigate('Signup'); // Navigate to the Signup screen
      };

    const handleLogin = () => {
        // Implement login logic
        navigation.navigate('MainApp');
    };


    const openResetPasswordPage = () =>{
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
                    />
                </View>



                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#888" />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
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

});

export default LoginScreen;