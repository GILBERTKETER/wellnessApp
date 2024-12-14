import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity
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

type HomeScreenProps = NativeStackScreenProps<RootTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Week');

    const dailyGoals = [
        { id: '1', title: 'Steps', progress: 6540, goal: 10000, icon: 'walk' },
        { id: '2', title: 'Water', progress: 1200, goal: 2000, icon: 'cup-water' },
        { id: '3', title: 'Meditation', progress: 15, goal: 30, icon: 'meditation' }
    ];

    const quickActions = [
        { id: '1', icon: 'dumbbell', title: 'Workout', color: '#6200ee' },
        { id: '2', icon: 'food-apple', title: 'Nutrition', color: '#03dac6' },
        { id: '3', icon: 'heart-pulse', title: 'Health', color: '#018786' }
    ];

    // Use parseInt to prevent floating-point precision issues
    const activityData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [5000, 6500, 4500, 7000, 6000, 8000, 5500].map(value => parseInt(value.toFixed(0), 10)),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
            }
        ]
    };

    const upcomingActivities = [
        { id: '1', title: 'Morning Yoga', time: '07:00 AM', duration: '30 min', icon: 'yoga' },
        { id: '2', title: 'HIIT Workout', time: '06:00 PM', duration: '45 min', icon: 'fire' },
        { id: '3', title: 'Meditation', time: '09:00 PM', duration: '15 min', icon: 'meditation' }
    ];

    const calculateProgress = (progress: number, goal: number) => {
        // Ensure floating-point safe division
        return Number((progress / goal).toFixed(2));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Good Morning,</Text>
                        <Title style={styles.username}>Sarah</Title>
                    </View>
                    <Avatar.Icon
                        size={50}
                        icon="account"
                        style={styles.avatar}
                    />
                </View>

                {/* Daily Goals */}
                <Text style={styles.sectionTitle}>Daily Goals</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.goalsContainer}
                >
                    {dailyGoals.map((goal) => (
                        <Surface key={goal.id} style={styles.goalCard}>
                            <View style={styles.goalContent}>
                                <Icon name={goal.icon} size={30} color="#6200ee" />
                                <Title style={styles.goalTitle}>{goal.title}</Title>
                                <Paragraph style={styles.goalProgress}>
                                    {goal.progress} / {goal.goal}
                                </Paragraph>
                                <ProgressBar
                                    progress={calculateProgress(goal.progress, goal.goal)}
                                    color="#6200ee"
                                    style={styles.progressBar}
                                />
                            </View>
                        </Surface>
                    ))}
                </ScrollView>

                {/* Activity Tracker */}
                <Text style={styles.sectionTitle}>Activity Tracker</Text>
                <View style={styles.chartContainer}>
                    <View style={styles.periodSelector}>
                        {['Week', 'Month', 'Year'].map((period) => (
                            <TouchableOpacity
                                key={period}
                                style={[
                                    styles.periodButton,
                                    selectedPeriod === period && styles.selectedPeriod
                                ]}
                                onPress={() => setSelectedPeriod(period)}
                            >
                                <Text style={styles.periodButtonText}>{period}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <LineChart
                        data={activityData}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#fff',
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                            style: { borderRadius: 16 },
                            propsForDots: { r: '6', strokeWidth: '2', stroke: '#6200ee' }
                        }}
                        bezier
                        style={styles.chart}
                    />
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsContainer}>
                    {quickActions.map((action) => (
                        <Card
                            key={action.id}
                            style={[styles.quickActionCard, { backgroundColor: action.color }]}
                            onPress={() => {/* Add navigation logic */ }}
                        >
                            <Card.Content style={styles.quickActionContent}>
                                <Icon
                                    name={action.icon}
                                    size={30}
                                    color="white"
                                    style={styles.quickActionIcon}
                                />
                                <Text style={styles.quickActionText}>{action.title}</Text>
                            </Card.Content>
                        </Card>
                    ))}
                </View>

                {/* Upcoming Activities */}
                <Text style={styles.sectionTitle}>Upcoming Activities</Text>
                <View style={styles.activitiesContainer}>
                    {upcomingActivities.map((activity) => (
                        <Surface key={activity.id} style={styles.activityCard}>
                            <View style={styles.activityContent}>
                                <Icon
                                    name={activity.icon}
                                    size={30}
                                    color="#6200ee"
                                    style={styles.activityIcon}
                                />
                                <View style={styles.activityDetails}>
                                    <Text style={styles.activityTitle}>{activity.title}</Text>
                                    <Text style={styles.activitySubtitle}>
                                        {activity.time} • {activity.duration}
                                    </Text>
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
        backgroundColor: '#6200ee',
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
    chartContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 10,
        padding: 10,
        elevation: 3,
    },
    periodSelector: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    periodButton: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 20,
    },
    selectedPeriod: {
        backgroundColor: '#6200ee',
    },
    periodButtonText: {
        color: '#6200ee',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
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
        backgroundColor: '#6200ee',
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