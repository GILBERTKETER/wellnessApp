import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './Screens/HomeScreen';
import WorkoutScreen from './Screens/WorkoutScreen';
import NutritionScreen from './Screens/NutritionScreen';
import MindfulnessScreen from './Screens/MindfulnessScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ServicePage from './Screens/Services';
import BlogPage from './Screens/Blogs';


// Import new screens
import LandingScreen from './Screens/LandingScreen';
import OnboardingScreen from './Screens/OnboardingScreen';
import LoginScreen from './Screens/Auth';
import SignupScreen from './Screens/Signup';
import ServiceDetailsScreen from './Screens/ServiceSingleVendor';


// Define the type for our Stack Navigator
export type RootStackParamList = {
  Landing: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  MainApp: undefined;
  SingleServices: undefined;
};

// Define the type for our Tab Navigator
export type RootTabParamList = {
  Home: undefined;
  Workout: undefined;
  Health: undefined;
  Mindfulness: undefined;
  Profile: undefined;
  Services: undefined;
  Blogs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// Bottom Tab Navigator Component
const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'heart';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            // case 'Workout':
            //   iconName = focused ? 'fitness' : 'fitness-outline';
            //   break;
              case 'Services':
                iconName = focused ? 'leaf' : 'leaf-outline';
                break;
            case 'Health':
              iconName = focused ? 'nutrition' : 'nutrition-outline';
              break;
            // case 'Mindfulness':
            //   iconName = focused ? 'medkit' : 'medkit-outline';
            //   break;
            case 'Blogs':
              iconName = focused ? 'newspaper' : 'newspaper-outline';
              break;

            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1D2231', //dark color
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Services" component={ServicePage} />
      {/* <Tab.Screen name="Workout" component={WorkoutScreen} /> */}
      <Tab.Screen name="Health" component={NutritionScreen} />
      {/* <Tab.Screen name="Mindfulness" component={MindfulnessScreen} /> */}
      <Tab.Screen name="Blogs" component={BlogPage} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Landing"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="SingleServices" component={ServiceDetailsScreen} />
            <Stack.Screen
              name="MainApp"
              component={BottomTabNavigator}
              options={{ gestureEnabled: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // marginTop: 50,
    backgroundColor: '#ffffff',
  },
});

export default App;