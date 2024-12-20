import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WellnessSection: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Got some questions about your wellness?</Text>
      
      {/* Chat with Experts Button */}
      <Button
        mode="contained"
        style={[styles.button, { backgroundColor: '#4caf50' }]} // Green color for experts
        icon={() => <Icon name="account-circle" size={20} color="white" />}
        labelStyle={styles.buttonText}
      >
        Chat with Experts
      </Button>

      {/* Chat with AI Button */}
      <Button
        mode="contained"
        style={[styles.button, { backgroundColor: '#2196f3' }]} // Blue color for AI
        icon={() => <Icon name="robot" size={20} color="white" />}
        labelStyle={styles.buttonText}
      >
        Chat with AI
      </Button>

      {/* Safe Space Button */}
      <Button
        mode="contained"
        style={[styles.button, { backgroundColor: '#f44336' }]} // Red color for Safe Space
        icon={() => <Icon name="shield" size={20} color="white" />}
        labelStyle={styles.buttonText}
      >
        Safe Space
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default WellnessSection;
