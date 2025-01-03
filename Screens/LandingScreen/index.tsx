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
        {/* {to set custome color for status bar} */}
<StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = 
"#FFFFFF" translucent = {true}/> 

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Wellness App</Text>
                <Text style={styles.subtitle}>
                Your Wellness, Your Way
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
        backgroundColor: '#FFFFFF', // A solid background color
    },
    contentContainer: {
        width: "85%",
        padding: 30,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#888',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#1D2231', //dark color
        textAlign: 'center',
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: '#1D2231', //dark color
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
});

export default LandingScreen;