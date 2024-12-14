import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import {
    Text,
    Card,
    Title,
    Paragraph,
    Surface,
    Avatar,
    Switch,
    Divider,
    List
} from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../App';

type ProfileScreenProps = NativeStackScreenProps<RootTabParamList, 'Profile'>;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

    const profileStats = [
        { id: '1', title: 'Total Workouts', value: '42' },
        { id: '2', title: 'Avg. Daily Steps', value: '8,245' },
        { id: '3', title: 'Meditation Time', value: '135 min' }
    ];

    const profileSettings = [
        {
            id: '1',
            title: 'Account Settings',
            icon: 'account-circle',
            onPress: () => {/* Add navigation logic */ }
        },
        {
            id: '2',
            title: 'Privacy',
            icon: 'lock',
            onPress: () => {/* Add navigation logic */ }
        },
        {
            id: '3',
            title: 'Help & Support',
            icon: 'help-circle',
            onPress: () => {/* Add navigation logic */ }
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <View style={styles.profileHeaderContent}>
                        <Avatar.Image
                            size={80}
                            source={{ uri: 'https://picsum.photos/200/200' }}
                            style={styles.avatar}
                        />
                        <View style={styles.profileInfo}>
                            <Title style={styles.username}>Sarah Johnson</Title>
                            <Paragraph style={styles.email}>sarah.johnson@example.com</Paragraph>
                        </View>
                    </View>
                </View>

                {/* Profile Stats */}
                <Text style={styles.sectionTitle}>My Progress</Text>
                <View style={styles.statsContainer}>
                    {profileStats.map((stat) => (
                        <Surface key={stat.id} style={styles.statCard}>
                            <View style={styles.statContent}>
                                <Title style={styles.statValue}>{stat.value}</Title>
                                <Paragraph>{stat.title}</Paragraph>
                            </View>
                        </Surface>
                    ))}
                </View>

                {/* Account Settings */}
                <Text style={styles.sectionTitle}>Settings</Text>
                <View style={styles.settingsContainer}>
                    <Card style={styles.settingsCard}>
                        <Card.Content>
                            <View style={styles.settingRow}>
                                <Text>Notifications</Text>
                                <Switch
                                    value={notificationsEnabled}
                                    onValueChange={setNotificationsEnabled}
                                />
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.settingRow}>
                                <Text>Dark Mode</Text>
                                <Switch
                                    value={darkModeEnabled}
                                    onValueChange={setDarkModeEnabled}
                                />
                            </View>
                        </Card.Content>
                    </Card>
                </View>

                {/* Profile Options */}
                <View style={styles.profileOptionsContainer}>
                    {profileSettings.map((setting) => (
                        <List.Item
                            key={setting.id}
                            title={setting.title}
                            left={(props) => <List.Icon {...props} icon={setting.icon} />}
                            right={(props) => <List.Icon {...props} icon="chevron-right" />}
                            onPress={setting.onPress}
                            style={styles.profileOptionItem}
                        />
                    ))}
                </View>

                {/* Logout */}
                <View style={styles.logoutContainer}>
                    <Card
                        style={styles.logoutCard}
                        onPress={() => {/* Add logout logic */ }}
                    >
                        <Card.Content style={styles.logoutContent}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </Card.Content>
                    </Card>
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
        padding: 20,
        backgroundColor: '#ffffff',
        elevation: 2,
    },
    profileHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 15,
    },
    profileInfo: {
        justifyContent: 'center',
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        color: '#666',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    statCard: {
        width: '30%',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
    },
    statContent: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6200ee',
    },
    settingsContainer: {
        paddingHorizontal: 10,
    },
    settingsCard: {
        borderRadius: 10,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    divider: {
        marginVertical: 5,
    },
    profileOptionsContainer: {
        marginTop: 20,
    },
    profileOptionItem: {
        paddingHorizontal: 10,
    },
    logoutContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 30,
    },
    logoutCard: {
        backgroundColor: '#ff4444',
        borderRadius: 10,
    },
    logoutContent: {
        alignItems: 'center',
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ProfileScreen;