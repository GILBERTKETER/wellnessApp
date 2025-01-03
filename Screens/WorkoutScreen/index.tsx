import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Platform,
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

type WorkoutScreenProps = NativeStackScreenProps<RootTabParamList, 'Workout'>;

const WorkoutScreen: React.FC<WorkoutScreenProps> = () => {
    const workoutCategories = [
        { id: '1', title: 'Strength', icon: 'fitness', color: '#6200ee' },
        { id: '2', title: 'Cardio', icon: 'run', color: '#03dac6' },
        { id: '3', title: 'Yoga', icon: 'meditation', color: '#018786' },
        { id: '4', title: 'HIIT', icon: 'pulse', color: '#bb86fc' }
    ];

    const recommendedWorkouts = [
        {
            id: '1',
            title: 'Full Body Strength',
            duration: '45 min',
            difficulty: 'Intermediate',
            image: 'https://picsum.photos/700/400?random=1'
        },
        {
            id: '2',
            title: 'Morning Yoga Flow',
            duration: '30 min',
            difficulty: 'Beginner',
            image: 'https://picsum.photos/700/400?random=2'
        }
    ];

    return (
              //  wraps the content with respect to status bar area
                //For android it is done dynamiccally while ios it automatic
                <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
                <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Title style={styles.screenTitle}>Workouts</Title>
                </View>

                {/* Workout Categories */}
                <Text style={styles.sectionTitle}>Categories</Text>
                <View style={styles.categoriesContainer}>
                    {workoutCategories.map((category) => (
                        <Card
                            key={category.id}
                            style={[styles.categoryCard, { backgroundColor: category.color }]}
                            onPress={() => {/* Add navigation logic */ }}
                        >
                            <Card.Content style={styles.categoryContent}>
                                <Avatar.Icon
                                    size={40}
                                    icon={category.icon}
                                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                                />
                                <Text style={styles.categoryText}>{category.title}</Text>
                            </Card.Content>
                        </Card>
                    ))}
                </View>

                {/* Recommended Workouts */}
                <Text style={styles.sectionTitle}>Recommended Workouts</Text>
                {recommendedWorkouts.map((workout) => (
                    <Card key={workout.id} style={styles.workoutCard}>
                        <Card.Cover source={{ uri: workout.image }} />
                        <Card.Content>
                            <Title>{workout.title}</Title>
                            <Paragraph>
                                {workout.duration} • {workout.difficulty}
                            </Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Text style={styles.startWorkoutText}>Start Workout</Text>
                        </Card.Actions>
                    </Card>
                ))}
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
        padding: 20,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    categoryCard: {
        width: '48%',
        marginBottom: 15,
        borderRadius: 10,
    },
    categoryContent: {
        alignItems: 'center',
        paddingVertical: 15,
    },
    categoryText: {
        color: 'white',
        marginTop: 10,
        fontSize: 14,
    },
    workoutCard: {
        marginHorizontal: 10,
        marginBottom: 15,
        borderRadius: 10,
    },
    startWorkoutText: {
        color: '#6200ee',
        fontWeight: 'bold',
    },
});

export default WorkoutScreen;