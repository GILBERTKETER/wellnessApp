import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Platform,
    Alert
} from 'react-native';
import {
    Text,
    Card,
    Title,
    Paragraph,
    Surface,
    Avatar,
    ProgressBar
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootTabParamList } from '../../App';
import DailyQuote from './dailyQuotes';
// import { getUserProfile } from '../../api/api';
import Realm from 'realm';
import EncryptedStorage from 'react-native-encrypted-storage';

type HomeScreenProps = NativeStackScreenProps<RootTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Week');
    const [profile, setProfile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const dailyGoals = [
        { id: '1', title: 'Today\'s Steps', progress: 6540, goal: 10000, icon: 'walk', color: '#1D2231' },
        { id: '2', title: 'Water Intake', progress: 1200, goal: 2000, icon: 'cup-water', color: '#03dac6' },
        { id: '3', title: 'Meditation Schedule', progress: 15, goal: 30, icon: 'meditation', color: '#ff5722' }
    ];

    const quickActions = [
        { id: '1', icon: 'dumbbell', title: 'Workout', color: '#DC143C' },
        { id: '2', icon: 'food-apple', title: 'Nutrition', color: '#04af5f' },
        { id: '3', icon: 'heart-pulse', title: 'Health', color: '#018786' }
    ];

    const activityData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [5000, 6500, 4500, 7000, 6000, 8000, 5500].map(value => parseInt(value.toFixed(0), 10)),
                color: () => `#1D223120`,
                strokeWidth: 2
            }
        ]
    };

    const upcomingActivities = [
        { id: '1', title: 'Morning Yoga', time: '07:00 AM', duration: '30 min', icon: 'yoga', color: '#1D2231' },
        { id: '2', title: 'HIIT Workout', time: '06:00 PM', duration: '45 min', icon: 'fire', color: '#ff5722' },
        { id: '3', title: 'Meditation', time: '09:00 PM', duration: '15 min', icon: 'meditation', color: '#03A9F4' }
    ];

    const calculateProgress = (progress: number, goal: number) => {
        return Number((progress / goal).toFixed(2));
    };

    const getGreeting = (firstName: string) => {
        const hours = new Date().getHours();
        if (hours < 12) {
            return `Good Morning, ${firstName}`;
        } else if (hours < 18) {
            return `Good Afternoon, ${firstName}`;
        } else {
            return `Good Evening, ${firstName}`;
        }
    };

    // const fetchProfile = async () => {
    //     try {
    //         // Retrieve tokens from EncryptedStorage
    //         const credentials = await EncryptedStorage.getItem("@userCredentials");
    //         if (!credentials) {
    //             throw new Error("User not logged in or credentials missing");
    //         }

    //         const { accessToken } = JSON.parse(credentials);

    //         // Fetch user profile
    //         const profileData = await getUserProfile(accessToken);
    //         setProfile(profileData.data); // Assuming `profileData.data` contains the user's profile

    //         // Save profile to Realm database
    //         const realm = await Realm.open({
    //             path: 'userProfileDB',
    //             schema: [
    //                 {
    //                     name: 'UserProfile',
    //                     primaryKey: '_id',
    //                     properties: {
    //                         _id: 'string',
    //                         email: 'string',
    //                         firstName: 'string',
    //                         lastName: 'string',
    //                         fullName: 'string',
    //                         isActive: 'bool',
    //                         lastLogin: 'date',
    //                         id: 'string',
    //                         createdAt: 'date',
    //                         updatedAt: 'date',
    //                         __v: 'int',
    //                     },
    //                 },
    //             ],
    //         });

    //         realm.write(() => {
    //             realm.create('UserProfile', {
    //                 _id: profileData.data._id,
    //                 email: profileData.data.email,
    //                 firstName: profileData.data.firstName,
    //                 lastName: profileData.data.lastName,
    //                 fullName: profileData.data.fullName,
    //                 isActive: profileData.data.isActive,
    //                 lastLogin: new Date(profileData.data.lastLogin),
    //                 id: profileData.data.id,
    //                 createdAt: new Date(profileData.data.createdAt),
    //                 updatedAt: new Date(profileData.data.updatedAt),
    //                 __v: profileData.data.__v,
    //             });
    //         });

    //         realm.close();
    //     } catch (error) {
    //         Alert.alert("Error", error instanceof Error ? error.message : "Failed to fetch user profile");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchProfile();
    // }, []);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
            <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        {/* <Avatar.Icon size={50} icon="account" style={styles.avatar} />
                        <Text style={styles.greeting}>{getGreeting(profile.firstName)}</Text>
                        <Title style={styles.username}>{profile.firstName}</Title> */}
                        
                        <Avatar.Icon size={50} icon="account" style={styles.avatar} />
                        <Text style={styles.greeting}>Hello,</Text>
                        <Title style={styles.username}>Sarah</Title>
                    </View>

                    <View style={styles.iconSection}>
                        <View style={styles.iconContainer}>
                            <Icon name="message" size={24} color="#fff" />
                        </View>
                        <View style={styles.iconContainer}>
                            <Icon name="bell" size={24} color="#fff" />
                        </View>
                    </View>
                </View>

                <DailyQuote />

                <Text style={styles.sectionTitle}>Daily Goals</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.goalsContainer}>
                    {dailyGoals.map((goal) => (
                        <Surface key={goal.id} style={styles.goalCard}>
                            <View style={styles.goalContent}>
                                <Icon name={goal.icon} size={30} color={goal.color} />
                                <Title style={styles.goalTitle}>{goal.title}</Title>
                                <Paragraph style={styles.goalProgress}>{goal.progress} / {goal.goal}</Paragraph>
                                <ProgressBar progress={calculateProgress(goal.progress, goal.goal)} color="#1D2231" style={styles.progressBar} />
                            </View>
                        </Surface>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>Step Statistics</Text>
                {/* <View style={styles.chartContainer}>
                    <LineChart
                        data={activityData}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(29, 34, 49, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: { borderRadius: 16 },
                            propsForDots: { r: '3', strokeWidth: '2', stroke: '#1D223120' }
                        }}
                        bezier
                        style={styles.chart}
                    />
                </View> */}

                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsContainer}>
                    {quickActions.map((action) => (
                        <Card key={action.id} style={[styles.quickActionCard, { backgroundColor: action.color }]}>
                            <Card.Content style={styles.quickActionContent}>
                                <Icon name={action.icon} size={30} color="white" style={styles.quickActionIcon} />
                                <Text style={styles.quickActionText}>{action.title}</Text>
                            </Card.Content>
                        </Card>
                    ))}
                </View>

                <Text style={styles.sectionTitle}>Upcoming Activities</Text>
                <View style={styles.activitiesContainer}>
                    {upcomingActivities.map((activity) => (
                        <Surface key={activity.id} style={styles.activityCard}>
                            <View style={styles.activityContent}>
                                <Icon name={activity.icon} size={30} color={activity.color} style={styles.activityIcon} />
                                <View style={styles.activityDetails}>
                                    <Text style={styles.activityTitle}>{activity.title}</Text>
                                    <Text style={styles.activitySubtitle}>{activity.time} • {activity.duration}</Text>
                                </View>
                                <TouchableOpacity style={styles.startButton}>
                                    <Text style={styles.startButtonText}>Start</Text>
                                </TouchableOpacity>
                            </View>
                        </Surface>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    greeting: {
        fontSize: 16,
        color: '#666',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    avatar: {
        backgroundColor: '#018786',
    },
    iconSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginLeft: 20,
        backgroundColor: '#333',
        padding: 8,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    goalsContainer: {
        paddingVertical: 10,
    },
    goalCard: {
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        width: 150,
        alignItems: 'center',
    },
    goalContent: {
        alignItems: 'center',
    },
    goalTitle: {
        marginTop: 10,
        fontSize: 16,
    },
    goalProgress: {
        marginTop: 5,
    },
    progressBar: {
        width: '100%',
        marginTop: 10,
        height: 8,
        borderRadius: 4,
    },
    chartContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
        elevation: 3,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    quickActionCard: {
        width: '30%',
        borderRadius: 10,
    },
    quickActionContent: {
        alignItems: 'center',
    },
    quickActionIcon: {
        marginBottom: 10,
    },
    quickActionText: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
    },
    activitiesContainer: {
        paddingHorizontal: 10,
    },
    activityCard: {
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
    },
    activityContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    activityIcon: {
        marginRight: 15,
    },
    activityDetails: {
        flex: 1,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    activitySubtitle: {
        color: '#666',
        marginTop: 5,
    },
    startButton: {
        backgroundColor: '#1D2231',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    startButtonText: {
        color: 'white',
        fontSize: 12,
    },
});

export default HomeScreen;
