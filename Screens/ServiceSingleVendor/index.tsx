import React from "react";
import { View, Text, 
    StyleSheet, 
    TouchableOpacity,
     ScrollView
     ,SafeAreaView,
    StatusBar,
    Platform,} from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

    type ServiceDetailsScreenProps = StackScreenProps<RootStackParamList, 'SingleServices'>;
    
    const ServiceDetailsScreen: React.FC<ServiceDetailsScreenProps> = ({ navigation }) => {
  return (
  <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />

    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>{"< Back"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Our Service</Text>
      </View>

      {/* Service Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>MedVina Yoga Studio</Text>
        </View>

        {/* Image Placeholder */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Image Placeholder</Text>
        </View>

        {/* Service Includes */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Our Services </Text>
          <Text style={styles.detailItem}>» Full body Massage</Text>
          <Text style={styles.detailItem}>» Guided Meditation</Text>
          <Text style={styles.detailItem}>» Morning Yoga</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.requestButton}>
              <Text style={styles.requestText}>Place Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveText}>Book Appointments</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.descriptionTitle}>Description</Text>
      <Text style={styles.descriptionText}>
        We are located in Nairobi.....
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit 
        repellat praesentium necessitatibus sequi consectetur iste totam ut repellendus
         maxime dolore dignissimos aut, provident repudiandae alias quae reprehenderit nemo saepe.
      </Text>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#123456",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    margin: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 3,
  },
  cardHeader: {
    backgroundColor: "#4A90E2",
    padding: 15,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagePlaceholder: {
    height: 150,
    backgroundColor: "#004D40",
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    color: "#fff",
    fontSize: 14,
  },
  detailsContainer: {
    padding: 15,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailItem: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  requestButton: {
    flex: 1,
    backgroundColor: "#6200EA",
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  requestText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#03A9F4",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: "#444",
    marginHorizontal: 15,
    lineHeight: 22,
  },
});

export default ServiceDetailsScreen;
