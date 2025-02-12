import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import WeatherData from '../../features/general/WeatherData.ts';

const WeatherScreen = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const apiKey = 'a364168d3842a8988f7282e798746e13';
    const city = 'Santo%20Domingo';

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    )
      .then(res => res.json())
      .then(data => {
        const mappedData: WeatherData = {
          location: {name: data.name},
          current: {
            temp_c: data.main.temp,
            condition: {
              text: data.weather[0].description,
              icon: data.weather[0].icon,
            },
          },
        };
        setWeather(mappedData);
      })
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
      <View style={styles.weatherContainer}>
        <Text style={styles.location}>Clima en {weather.location.name}</Text>
        <Text style={styles.temp}>{weather.current.temp_c} °C</Text>
        {weather.current.condition.icon && (
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 100,
              height: 100,
            }}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.current.condition.icon}@2x.png`,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    padding: 20,
    borderRadius: 18,
  },
  location: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  condition: {
    fontSize: 18,
  },
});

export default WeatherScreen;
