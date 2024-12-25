import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";

import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../App';
import { RootStackParamList } from '../../App';

const servicesData = [
  {
    id: "1",
    category: "Yoga",
    image: "Massage.jpg", // Name of the image
    location: "Westlands",
    vendorName: "Medvina Yoga Studio",
    rating: 4.8,
    isLiked: false,
  },
  {
    id: "2",
    category: "Spa",
    image: "personal care01.jpg", // Name of the image
    location: "Nairobi CBD",
    vendorName: "Dians's Personal care",
    rating: 4.5,
    isLiked: true,
  },
  {
    id: "3",
    category: "Massage",
    image: "personal care02.jpg", // Name of the image
    location: "Runda",
    vendorName: "Healing Touch Massage",
    rating: 4.7,
    isLiked: false,
  },
];

type ServicePageProps = NativeStackScreenProps<RootTabParamList, 'Services'>;

const ServicePage: React.FC<ServicePageProps> = ( {navigation} ) => {
  const [services, setServices] = useState(servicesData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle like button
  const toggleLike = (id: String) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, isLiked: !service.isLiked } : service
      )
    );
  };

  // Filter services based on category and search query
  const filteredServices = services.filter(
    (service) =>
      (selectedCategory === "All" || service.category === selectedCategory) &&
      service.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const openSingleServiceVendor = () => {
    navigation.navigate('SingleServices'); // Navigate to the Service vendor screen
};

  return (
    <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.mainText}>Invest in Your Wellness</Text>
          <Text style={styles.subText}>Hire Proffessions to help you Acheive Wellness, Book appontments today</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Slidable Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {["All", "Yoga", "Spa", "Massage", "Workout", "Mental Health", "Guided Meditations", "Nature Walks", "Group Talk"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.filterButton, selectedCategory === category && styles.selectedFilter]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.filterText, selectedCategory === category && styles.selectedFilterText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Service Cards */}
        <FlatList
          data={filteredServices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}
            onPress={openSingleServiceVendor}>
              {/* Dynamic Image Handling */}
              <ImageBackground
                source={require('../../assets/uploads/personal care01.jpg')} // Local asset
                style={styles.cardImage}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardRating}>⭐ {item.rating}</Text>
                    <TouchableOpacity onPress={() => toggleLike(item.id)}>
                      <Text style={styles.likeButton}>
                        {item.isLiked ? "♥" : "♡"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.cardVendor}>{item.vendorName}</Text>
                  <Text style={styles.cardLocation}>{item.location}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          style={styles.serviceList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 20, backgroundColor: "#123456", alignItems: "center" },
  mainText: { fontSize: 25, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  subText: { fontSize: 17, color: "#fff", marginBottom: 10},
  searchInput: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 10, // Space for filters
  },
  filterContainer: {
    flexDirection: "row",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexWrap: 'nowrap', // Prevent wrapping if the container doesn't fit
     height: 40,
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
    height: 40,  // Set fixed height for consistency
    justifyContent: 'center', // Vertically center text
    alignItems: 'center', // Horizontally center text
  },
  selectedFilter: { backgroundColor: "#123456" },
  filterText: { 
    fontSize: 16, 
    color: "#000", 
    textAlign: 'center', // Ensure text is centered
    flexWrap: 'wrap', // Allow text wrapping if needed
  },
  selectedFilterText: { color: "#fff" },
  serviceList: { paddingHorizontal: 10, marginTop: 10 },
  card: { marginBottom: 15, borderRadius: 10, overflow: "hidden", elevation: 3 },
  cardImage: { height: 200, justifyContent: "flex-end" },
  cardContent: { padding: 10, backgroundColor: "#1D223170" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  cardRating: { color: "#FFD700", fontSize: 16, fontWeight: "bold" },
  likeButton: { fontSize: 20, color: "#FFD700" },
  cardVendor: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  cardLocation: { fontSize: 14, color: "#ddd" },
});

export default ServicePage;
