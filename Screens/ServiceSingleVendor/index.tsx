import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import VendorReview from "./VendorReview";

type ServiceDetailsScreenProps = StackScreenProps<RootStackParamList, "SingleServices">;

const ServiceDetailsScreen: React.FC<ServiceDetailsScreenProps> = ({ navigation }) => {
  const staticContent = [
    { id: "header", type: "header" },
    { id: "serviceCard", type: "serviceCard" },
    { id: "description", type: "description" },
    { id: "vendorReview", type: "vendorReview" },
  ];

  const renderItem = ({ item }: { item: { id: string; type: string } }) => {
    switch (item.type) {
      case "header":
        return (
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backText}>{"< Back"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>MedVina Yoga Studio</Text>
          </View>
        );
      case "serviceCard":
        return (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                Book appointment or visit us at www.medvina.com
              </Text>
            </View>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>Image Placeholder</Text>
            </View>
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
        );
      case "description":
        return (
          <>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              We are located in Nairobi..... Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Qui sit repellat praesentium necessitatibus sequi consectetur iste totam ut
              repellendus maxime dolore dignissimos aut, provident repudiandae alias quae
              reprehenderit nemo saepe.
            </Text>
          </>
        );
      case "vendorReview":
        return <VendorReview />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <FlatList
        data={staticContent}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    paddingBottom: 20, // Add padding for scrolling
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
