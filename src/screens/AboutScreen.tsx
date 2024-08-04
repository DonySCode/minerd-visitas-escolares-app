import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.text}>
        This app is a simple example of a React Native application with
        TypeScript. It includes features like displaying news, weather, and
        horoscopes. The app is still under development and more features will be
        added soon.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AboutScreen;
