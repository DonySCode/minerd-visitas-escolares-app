import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface WeatherData {
  location: {name: string};
  current: {temp_c: number; condition: {text: string; icon: string}};
}

const WeatherScreen = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const apiKey = 'a364168d3842a8988f7282e798746e13';
    const city = 'Santo Domingo';

    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`,
    )
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(error => console.error('Error fetching weather:', error));
  }, []);

  if (!weather) {
    return (
      <View style={styles.container}>
        <Text>Loading weather...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>Weather in {weather.location.name}</Text>
      <Text style={styles.temp}>{weather.current.temp_c} °C</Text>
      <Text style={styles.condition}>{weather.current.condition.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  condition: {
    fontSize: 18,
  },
});

export default WeatherScreen;
