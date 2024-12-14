import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
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

type MindfulnessScreenProps = NativeStackScreenProps<RootTabParamList, 'Mindfulness'>;

const MindfulnessScreen: React.FC<MindfulnessScreenProps> = () => {
    const meditationTypes = [
        { id: '1', title: 'Stress Relief', duration: '10 min', icon: 'meditation', color: '#6200ee' },
        { id: '2', title: 'Sleep', duration: '15 min', icon: 'moon', color: '#03dac6' },
        { id: '3', title: 'Focus', duration: '20 min', icon: 'brain', color: '#018786' }
    ];

    const mindfulnessActivities = [
        {
            id: '1',
            title: 'Guided Breathing Exercise',
            description: 'Calm your mind and reduce anxiety',
            image: 'https://picsum.photos/700/400?random=5'
        },
        {
            id: '2',
            title: 'Mindful Walking Meditation',
            description: 'Connect with your surroundings and inner peace',
            image: 'https://picsum.photos/700/400?random=6'
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Title style={styles.screenTitle}>Mindfulness</Title>
                </View>

                {/* Meditation Types */}
                <Text style={styles.sectionTitle}>Meditation Types</Text>
                <View style={styles.meditationContainer}>
                    {meditationTypes.map((meditation) => (
                        <Card
                            key={meditation.id}
                            style={[styles.meditationCard, { backgroundColor: meditation.color }]}
                            onPress={() => {/* Add navigation logic */ }}
                        >
                            <Card.Content style={styles.meditationContent}>
                                <Avatar.Icon
                                    size={40}
                                    icon={meditation.icon}
                                    style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                                />
                                <Text style={styles.meditationText}>{meditation.title}</Text>
                                <Paragraph style={styles.durationText}>{meditation.duration}</Paragraph>
                            </Card.Content>
                        </Card>
                    ))}
                </View>

                {/* Mindfulness Activities */}
                <Text style={styles.sectionTitle}>Recommended Activities</Text>
                {mindfulnessActivities.map((activity) => (
                    <Card key={activity.id} style={styles.activityCard}>
                        <Card.Cover source={{ uri: activity.image }} />
                        <Card.Content>
                            <Title>{activity.title}</Title>
                            <Paragraph>{activity.description}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Text style={styles.startActivityText}>Start Activity</Text>
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
    meditationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    meditationCard: {
        width: '30%',
        borderRadius: 10,
    },
    meditationContent: {
        alignItems: 'center',
    },
    meditationText: {
        color: 'white',
        marginTop: 10,
        fontSize: 12,
    },
    durationText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
    },
    activityCard: {
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 10,
    },
    startActivityText: {
        color: '#6200ee',
        fontWeight: 'bold',
    },
});

export default MindfulnessScreen;