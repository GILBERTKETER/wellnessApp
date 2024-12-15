import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
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

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const handleLogin = () => {
        // Implement login logic
        navigation.navigate('MainApp');
    };

    return (
        <View style={styles.container}>
            <Surface style={styles.card}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>
                    Sign in to continue to FitPro
                </Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                        left={
                            <TextInput.Icon
                                name={() => (
                                    <Icon
                                        name="email-outline"
                                        size={24}
                                        color="#6200EE"
                                    />
                                )}
                            />
                        }
                        theme={{
                            colors: {
                                primary: '#6200EE',
                                background: 'transparent'
                            }
                        }}
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={secureTextEntry}
                        style={styles.input}
                        left={
                            <TextInput.Icon
                                name={() => (
                                    <Icon
                                        name="lock-outline"
                                        size={24}
                                        color="#6200EE"
                                    />
                                )}
                            />
                        }
                        right={
                            <TextInput.Icon
                                name={() => (
                                    <Icon
                                        name="eye-outline"
                                        size={24}
                                        color="#6200EE"
                                        onPress={() => setSecureTextEntry(!secureTextEntry)}
                                    />
                                )}
                            />
                        }
                        theme={{
                            colors: {
                                primary: '#6200EE',
                                background: 'transparent'
                            }
                        }}
                    />

                    <Text style={styles.forgotPassword}>
                        Forgot Password?
                    </Text>
                </View>

                <Button
                    mode="contained"
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    Login
                </Button>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>
                        Don't have an account?
                    </Text>
                    <Button
                        mode="text"
                        onPress={() => {/* Navigate to Signup screen */ }}
                    >
                        Sign Up
                    </Button>
                </View>
            </Surface>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6200EE', // Replaced LinearGradient with solid background
    },
    card: {
        width: width * 0.85,
        padding: 30,
        borderRadius: 20,
        elevation: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6200EE',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'transparent',
    },
    forgotPassword: {
        textAlign: 'right',
        color: '#6200EE',
        marginTop: -10,
        marginBottom: 15,
    },
    loginButton: {
        marginTop: 10,
        padding: 5,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    signupText: {
        color: '#666',
    }
});

export default LoginScreen;