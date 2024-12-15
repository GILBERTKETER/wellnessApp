import React from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

const { width, height } = Dimensions.get('window');

type OnboardingScreenProps = StackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
    const handleDone = () => {
        navigation.navigate('Login');
    };

    return (
        <Onboarding
            onDone={handleDone}
            onSkip={handleDone}
            pages={[
                {
                    backgroundColor: '#FFFFFF',
                    image: (
                        <View style={styles.lottieContainer}>
                             {/* {to set custome color for status bar} */}
                            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = 
                            "#FFFFFF" translucent = {true}/> 
                            <LottieView
                                source={require('../../assets/fitness-tracking.json')}
                                autoPlay
                                loop
                                style={styles.lottieAnimation}
                            />
                        </View>
                    ),
                    title: 'Track Your Progress',
                    subtitle: 'Monitor your fitness journey with advanced tracking tools',
                },
                {
                    backgroundColor: '#03DAC6',
                    image: (
                        <View style={styles.lottieContainer}>
                             {/* {to set custome color for status bar} */}
                             <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = 
                            "#03DAC6" translucent = {true}/>
                            <LottieView
                                source={require('../../assets/workout-analytics.json')}
                                autoPlay
                                loop
                                style={styles.lottieAnimation}
                            />
                        </View>
                    ),
                    title: 'Personalized Insights',
                    subtitle: 'Get detailed analytics tailored to your fitness goals',
                },
                {
                    backgroundColor: '#018786',
                    image: (
                        <View style={styles.lottieContainer}>
                             {/* {to set custome color for status bar} */}
                             <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = 
                            "#018786" translucent = {true}/>
                            <LottieView
                                source={require('../../assets/community-fitness.json')}
                                autoPlay
                                loop
                                style={styles.lottieAnimation}
                            />
                        </View>
                    ),
                    title: 'Connect & Challenge',
                    subtitle: 'Join fitness communities and take on exciting challenges',
                }
            ]}
        />
    );
};

const styles = StyleSheet.create({
    lottieContainer: {
        width: width * 0.8,
        height: height * 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottieAnimation: {
        width: '100%',
        height: '100%',
    }
});

export default OnboardingScreen;