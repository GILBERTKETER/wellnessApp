import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Animated } from 'react-native';

const DailyQuote = () => {
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate text opacity on mount
    Animated.timing(textOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    //the images and quotes will be dynamically generated either by AI or the system admin
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/innocence.jpg')}
        style={styles.background}
        imageStyle={{ borderRadius: 12 }}
      >
        {/* Greenish Overlay Wrapper */}
        <View style={styles.overlay}>
          <Animated.View style={{ opacity: textOpacity }}>
            <Text style={styles.caption}>Daily Quotes</Text>
            <Text style={styles.quote}>“Your Health, Your Asset”</Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    borderRadius: 12,
    elevation: 4, // Shadow for Android
  },
  background: {
    height: 200, // Overall height of the image
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 20, // Overlay is near the bottom, not full height
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 128, 0, 0.4)', // Greenish translucent overlay
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  caption: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DFFFD6', // Light greenish white for contrast
    textAlign: 'center',
    marginBottom: 4,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF', // White for the quote
    textAlign: 'center',
  },
});

export default DailyQuote;
