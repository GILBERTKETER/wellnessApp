import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const VendorReview = () => {
  // State for managing reviews
  const [reviews, setReviews] = useState([
    { id: 1, name: "John Doe", rating: 5, comment: "Excellent service!" },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Good experience, but there's room for improvement.",
    },
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  // Function to submit a review
  const submitReview = async () => {
    if (newRating === 0 || newComment.trim() === "") {
      Alert.alert("Error", "Please provide a rating and a comment.");
      return;
    }

    const newReview = { rating: newRating, comment: newComment };
    try {
      const response = await fetch("https://your-backend-api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const savedReview = await response.json();
        setReviews((prev) => [
          ...prev,
          { id: savedReview.id, name: "Anonymous", ...newReview },
        ]);
        setNewRating(0);
        setNewComment("");
        Alert.alert("Success", "Your review has been submitted.");
      } else {
        Alert.alert("Error", "Failed to submit review. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Function to render each review
  const renderReview = ({
    item,
  }: {
    item: { id: number; name: string; rating: number; comment: string };
  }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewName}>{item.name}</Text>
      <View style={styles.reviewRating}>
        {[...Array(item.rating)].map((_, index) => (
          <Icon key={index} name="star" size={20} color="#FFD700" />
        ))}
        {[...Array(5 - item.rating)].map((_, index) => (
          <Icon key={index} name="star-outline" size={20} color="#FFD700" />
        ))}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>
  );

  return (
    <View>
      {/* Reviews Section */}
      <Text style={styles.sectionTitle}>Reviews</Text>
      <FlatList
        data={reviews}
        renderItem={renderReview}
        keyExtractor={(item) => item.id.toString()}
        style={styles.reviewList}
      />

      {/* Add Review Section */}
      <View style={styles.addReviewSection}>
        <Text style={styles.addReviewTitle}>Add a Review</Text>

        {/* Rating Input */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Your Rating:</Text>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setNewRating(star)}>
              <Icon
                name={newRating >= star ? "star" : "star-outline"}
                size={30}
                color="#FFD700"
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Comment Input */}
        <TextInput
          style={styles.commentInput}
          placeholder="Write your review here..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
          <Text style={styles.submitText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 18, fontWeight: "bold", margin: 15 },
  reviewList: { marginHorizontal: 15, marginBottom: 15 },
  reviewItem: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
  },
  reviewName: { fontSize: 16, fontWeight: "bold" },
  reviewRating: { flexDirection: "row", marginTop: 5 },
  reviewComment: { fontSize: 14, marginTop: 5 },
  addReviewSection: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 15,
    elevation: 2,
  },
  addReviewTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  ratingLabel: { fontSize: 14, marginRight: 10 },
  star: { marginHorizontal: 4 },
  commentInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    height: 80,
  },
  submitButton: {
    backgroundColor: "#6200EA",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default VendorReview;
