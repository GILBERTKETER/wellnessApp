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
  Image,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import VendorReview from "./VendorReview";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
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
  <View style={styles.locationContainer}>
    <MaterialCommunityIcons name="map-marker" size={20} color="#fff" />
    <Text style={styles.locationText}>Nairobi</Text>
  </View>
</View>
            <View style={styles.imagePlaceholder}>
              <Image
                source={require('../../assets/uploads/spa.jpg')}
                style={styles.image}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsTitle}>Our Services </Text>
              <Text style={styles.detailItem}>» Full body Massage</Text>
              <Text style={styles.detailItem}>» Guided Meditation</Text>
              <Text style={styles.detailItem}>» Morning Yoga</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                  <MaterialCommunityIcons name="account-plus" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Place Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <MaterialCommunityIcons name="calendar-check" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Book Appointment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <MaterialCommunityIcons name="message" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <MaterialCommunityIcons name="account-box" size={20} color="#fff" />
                  <Text style={styles.buttonText}>View Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <MaterialCommunityIcons name="file-document" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Catalogue</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <MaterialCommunityIcons name="file-document" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Website</Text>
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
      <StatusBar backgroundColor="#123456" barStyle="light-content" />
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
    paddingBottom: 20,
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
    backgroundColor: "#123456", // Matching the theme
    padding: 15,
  },
  locationContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 5,
  },
  locationText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
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
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
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
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 15,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#123456",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "48%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 5,
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
