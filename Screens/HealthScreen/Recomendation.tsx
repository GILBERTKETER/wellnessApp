import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Modal,
    TouchableOpacity,
    Alert,
    Button,
    Platform,
} from 'react-native';
import { Card, 
    Text,
     Title,
    Paragraph,
    Surface,
    Avatar,
    ProgressBar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const RecomendetionsSection: React.FC = () => {
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
        <SafeAreaView style={styles.container}>
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

export default RecomendetionsSection;
