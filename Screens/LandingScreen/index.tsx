import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ImageBackground,
    StatusBar
} from 'react-native';
import {
    Text,
    Button
} from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

const { width, height } = Dimensions.get('window');

type LandingScreenProps = StackScreenProps<RootStackParamList, 'Landing'>;

const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>FitPro</Text>
                <Text style={styles.subtitle}>
                    Your Personalized Fitness Companion
                </Text>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Onboarding')}
                    style={styles.loginButton}
                >
                    Get Started
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#6200EE', // A solid background color
    },
    contentContainer: {
        width: width * 0.85,
        padding: 30,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginBottom: 30,
    },
    loginButton: {
        width: '100%',
    },
});

export default LandingScreen;