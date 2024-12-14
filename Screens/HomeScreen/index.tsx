import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import {
    Text,
    Card,
    Title,
    Paragraph,
    Surface,
    Avatar
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../App';

type HomeScreenProps = NativeStackScreenProps<RootTabParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = () => {
    const dailyGoals = [
        { id: '1', title: 'Steps', progress: 6540, goal: 10000 },
        { id: '2', title: 'Water', progress: 1200, goal: 2000 },
        { id: '3', title: 'Meditation', progress: 15, goal: 30 }
    ];

    const quickActions = [
        { id: '1', icon: 'fitness', title: 'Start Workout', color: '#6200ee' },
        { id: '2', icon: 'nutrition', title: 'Meal Plan', color: '#03dac6' },
        { id: '3', icon: 'medkit', title: 'Mindfulness', color: '#018786' }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
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
                    showsHorizontalScrollIndicator={true}
                    style={styles.goalsContainer}
                >
                    {dailyGoals.map((goal) => (
                        <Surface key={goal.id} style={styles.goalCard}>
                            <View style={styles.goalContent}>
                                <Title>{goal.title}</Title>
                                <Paragraph>
                                    {goal.progress} / {goal.goal}
                                </Paragraph>
                            </View>
                        </Surface>
                    ))}
                </ScrollView>

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
                                <Avatar.Icon
                                    size={40}
                                    icon={action.icon}
                                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                                />
                                <Text style={styles.quickActionText}>{action.title}</Text>
                            </Card.Content>
                        </Card>
                    ))}
                </View>

                {/* Recommended Activities */}
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <Card style={styles.recommendedCard}>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Content>
                        <Title>30-Minute Yoga Flow</Title>
                        <Paragraph>Relax and stretch with this gentle yoga routine</Paragraph>
                    </Card.Content>
                </Card>
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
        paddingHorizontal: 10,
    },
    goalCard: {
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        width: 150,
    },
    goalContent: {
        alignItems: 'center',
    },
    quickActionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    quickActionCard: {
        width: '30%',
        borderRadius: 10,
    },
    quickActionContent: {
        alignItems: 'center',
    },
    quickActionText: {
        color: 'white',
        marginTop: 10,
        fontSize: 12,
    },
    recommendedCard: {
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10,
    },
});

export default HomeScreen;