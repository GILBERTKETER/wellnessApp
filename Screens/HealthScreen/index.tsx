import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  TouchableOpacity,
  Modal,
  Text as RNText
} from 'react-native';
import { Text, Card, Title, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../App';

type NutritionScreenProps = NativeStackScreenProps<RootTabParamList, 'Health'>;

const NutritionScreen: React.FC<NutritionScreenProps> = () => {
  // Define the card data, including whether the menu icon should be shown and the icon colors
  const cardData = [
    { title: 'Mental Health', description: 'Mental well-being information.', showMenu: true, icon: 'brain', iconColor: '#07ABF4', menuItems: ['Yoga', 'Forum Activities'] },
    { title: 'Dietary', description: 'Dietary information for a healthy lifestyle.', showMenu: false, icon: 'food', iconColor: '#04af5f', menuItems: [] },
    { title: 'Physical Fit', description: 'Physical health tips and routines.', showMenu: true, icon: 'arm-flex', iconColor: '#121829a9', menuItems: ['Gym'] },
    { title: 'General Wellness', description: 'Guidelines to live healthy free from illness', showMenu: false, icon: 'medical-bag', iconColor: 'orangered', menuItems: [] },
    { title: 'Social Interactions', description: 'Guidelines to social interactions understanding one\'s fellings', showMenu: false, icon: 'account-group', iconColor: '#1D2231', menuItems: [] },
  ];

  const [visible, setVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleMenuPress = (title: string) => {
    setSelectedCard(title);
    setVisible(true);
  };

  const handleCloseMenu = () => {
    setVisible(false);
    setSelectedCard(null);
  };

  const handleMenuOptionPress = (option: string) => {
    Alert.alert(`${option} selected for ${selectedCard}`);
    setVisible(false);
  };

  const renderCard = (data: { title: string; description: string; showMenu: boolean; icon: string; iconColor: string; menuItems: string[] }) => (
    <Card style={styles.card} key={data.title}>
      <Card.Content>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.text}>{data.description}</Text>
      </Card.Content>

      {/* Icon displayed below the text */}
      <View style={styles.iconContainer}>
        <Icon name={data.icon} size={40} color={data.iconColor} />
      </View>

      {data.showMenu && (
        <TouchableOpacity onPress={() => handleMenuPress(data.title)} style={styles.menuIcon}>
          <Icon name="dots-vertical" size={24} color="gray" />
        </TouchableOpacity>
      )}

      <Card.Actions>
        <Button onPress={() => Alert.alert(`${data.title} Get Started clicked`)}>Get Started</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Title style={styles.screenTitle}>Your Health Wellness</Title>
        </View>

        <View style={styles.container}>
          <View style={styles.cardContainer}>
            {cardData.map((data) => renderCard(data))}
          </View>
        </View>

        {/* Modal for menu options */}
        {visible && selectedCard && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={handleCloseMenu}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <RNText style={styles.modalTitle}>Menu for {selectedCard}</RNText>
                {cardData.find(card => card.title === selectedCard)?.menuItems.map((item, index) => (
                  <Button key={index} onPress={() => handleMenuOptionPress(item)}>
                    {item}
                  </Button>
                ))}
                <Button onPress={handleCloseMenu}>Close</Button>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  header: {
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 8,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    color: 'gray',
  },
  iconContainer: {
    marginTop: 16,
    alignItems: 'center',  // Align the icons in the center
  },
  menuIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default NutritionScreen;
