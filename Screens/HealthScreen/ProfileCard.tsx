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
import { Card, Text, Title, IconButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const ProfileCard: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<string | null>(null);
    const [value, setValue] = useState<string>('150.0'); // Default value

    // Generate picker options for height (150.0 to 200.0)
    const generatePickerValues = (start: number, end: number, step: number): string[] => {
        const values = [];
        for (let i = start; i <= end; i += step) {
            values.push(i.toFixed(1)); // Convert to string with one decimal place
        }
        return values;
    };

    const pickerValues = generatePickerValues(0, 200, 0.1);

    const handleEditPress = (field: string, currentValue: string) => {
        setSelectedField(field);
        setValue(currentValue);
        setModalVisible(true);
    };

    const handleSave = () => {
        Alert.alert(`${selectedField} updated to ${value}`);
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title style={styles.title}>Profile Details</Title>

                    {/* Profile Sections */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Weight</Text>
                        <View style={styles.column}>
                            <Text style={styles.value}>65.0 kg</Text>
                            <TouchableOpacity onPress={() => handleEditPress('Weight', '65.0')}>
                                <IconButton icon="pencil" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Height</Text>
                        <View style={styles.column}>
                            <Text style={styles.value}>173.0 cm</Text>
                            <TouchableOpacity onPress={() => handleEditPress('Height', '173.0')}>
                                <IconButton icon="pencil" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Blood Group</Text>
                        <View style={styles.column}>
                            <Text style={styles.value}>O+</Text>
                            <TouchableOpacity onPress={() => handleEditPress('Blood Group', 'O+')}>
                                <IconButton icon="pencil" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Gender</Text>
                        <View style={styles.column}>
                            <Text style={styles.value}>Male</Text>
                            <TouchableOpacity onPress={() => handleEditPress('Gender', 'Male')}>
                                <IconButton icon="pencil" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card.Content>
            </Card>

            {/* Modal for Editing */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{`Edit ${selectedField}`}</Text>
                        {selectedField === 'Height' || selectedField === 'Weight' ? (
                            <Picker
                                selectedValue={value}
                                onValueChange={(itemValue) => setValue(itemValue)}
                                style={styles.picker}
                            >
                                {pickerValues.map((val) => (
                                    <Picker.Item key={val} label={`${val} ${selectedField === 'Height' ? 'cm' : 'kg'}`} value={val} />
                                ))}
                            </Picker>
                        ) : (
                            <Text>{`Editing ${selectedField}`}</Text>
                        )}
                        <View style={styles.modalActions}>
                            <Button title="Save" onPress={handleSave} />
                            <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        padding: 16,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
        flexWrap: 'wrap',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    value: {
        fontSize: 16,
        color: 'gray',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    picker: {
        height: 150,
        width: '100%',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ProfileCard;
