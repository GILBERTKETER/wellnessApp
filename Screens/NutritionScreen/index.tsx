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


type NutritionScreenProps = NativeStackScreenProps<RootTabParamList, 'Nutrition'>;

const NutritionScreen: React.FC<NutritionScreenProps> = () => {
    const nutritionStats = [
        { id: '1', title: 'Calories', consumed: 1450, goal: 2000 },
        { id: '2', title: 'Protein', consumed: 65, goal: 100 },
        { id: '3', title: 'Carbs', consumed: 180, goal: 250 }
    ];

    const mealPlans = [
        {
            id: '1',
            title: 'Balanced Meal Plan',
            description: 'Healthy and nutritious meals for weight management',
            calories: '1800 cal/day',
            image: 'https://picsum.photos/700/400?random=3'
        },
        {
            id: '2',
            title: 'High Protein Diet',
            description: 'Meal plan focused on muscle building and recovery',
            calories: '2200 cal/day',
            image: 'https://picsum.photos/700/400?random=4'
        }
    ];

    return (
        //  wraps the content with respect to status bar area
                       //For android it is done dynamiccally while ios it automatic
                       <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
                       <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
                       <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Title style={styles.screenTitle}>Nutrition</Title>
                </View>

                {/* Nutrition Stats */}
                <Text style={styles.sectionTitle}>Today's Nutrition</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.statsContainer}
                >
                    {nutritionStats.map((stat) => (
                        <Surface key={stat.id} style={styles.statCard}>
                            <View style={styles.statContent}>
                                <Title>{stat.title}</Title>
                                <Paragraph>
                                    {stat.consumed} / {stat.goal}
                                </Paragraph>
                            </View>
                        </Surface>
                    ))}
                </ScrollView>

                {/* Meal Plans */}
                <Text style={styles.sectionTitle}>Recommended Meal Plans</Text>
                {mealPlans.map((plan) => (
                    <Card key={plan.id} style={styles.mealPlanCard}>
                        <Card.Cover source={{ uri: plan.image }} />
                        <Card.Content>
                            <Title>{plan.title}</Title>
                            <Paragraph>{plan.description}</Paragraph>
                            <Paragraph style={styles.calorieText}>{plan.calories}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Text style={styles.actionText}>View Plan</Text>
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
    statsContainer: {
        paddingVertical: 10,
    },
    statCard: {
        marginHorizontal: 10,
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        width: 150,
    },
    statContent: {
        alignItems: 'center',
    },
    mealPlanCard: {
        marginHorizontal: 10,
        marginBottom: 15,
        borderRadius: 10,
    },
    calorieText: {
        color: '#6200ee',
        fontWeight: 'bold',
        marginTop: 5,
    },
    actionText: {
        color: '#6200ee',
        fontWeight: 'bold',
    },
});

export default NutritionScreen;