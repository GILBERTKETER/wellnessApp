import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootTabParamList } from "../../App";
import BlogSection from "./BlogSection"; // Ensure BlogSection is implemented

type BlogPageProps = NativeStackScreenProps<RootTabParamList, "Blogs">;

const BlogPage: React.FC<BlogPageProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.mainText}>Blogs, Be Aware of Your Wellness</Text>
          <Text style={styles.subText}>
            Read life-changing blogs on how to live a healthy lifestyle. Leave
            a comment and subscribe to receive notifications.
          </Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Blogs..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Slidable Filter Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {["All", "Bad Habits", "Healthy Lifestyle"].map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                selectedCategory === category && styles.selectedFilter,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category && styles.selectedFilterText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Blog Section */}
        <BlogSection
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 20, backgroundColor: "#123456", alignItems: "center" },
  mainText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subText: { fontSize: 17, color: "#fff", marginBottom: 10 },
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
    backgroundColor: "#fff",
    paddingVertical: 5, // Reduced padding to save space
    paddingHorizontal: 5,
    height: 45, // Slightly reduced height for a better fit
    alignItems: "center", // Aligns buttons vertically in the center
  },
  filterButton: {
    paddingHorizontal: 15,
    height: 40, // Fixed height for consistency
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
    marginRight: 10, // Space between buttons
  },
  selectedFilter: { backgroundColor: "#123456" },
  filterText: { fontSize: 16, color: "#000" },
  selectedFilterText: { color: "#fff" },
});
export default BlogPage;
