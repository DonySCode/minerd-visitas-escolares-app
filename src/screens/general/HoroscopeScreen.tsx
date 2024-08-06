import React, {useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import HoroscopeData from '../../features/general/HoroscopeData.ts';
import MinerdAppButton from '../../ui/MinerdAppButton.tsx';

const zodiacSigns = [
  'aries',
  'taurus',
  'gemini',
  'cancer',
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
] as const;

type ZodiacSign = (typeof zodiacSigns)[number];

const HoroscopeScreen: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign>('aries');
  const [horoscope, setHoroscope] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const getHoroscope = async () => {
    setLoading(true);
    try {
      fetch(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${selectedSign}&day=TODAY`,
      ).then(response =>
        response.json().then(r => {
          const data: HoroscopeData = r.data;
          setHoroscope(data.horoscope_data);
        }),
      );
    } catch (error) {
      console.error('Error fetching horoscope:', error);
      setHoroscope('Error fetching horoscope. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedSign}
        onValueChange={(itemValue: ZodiacSign) => setSelectedSign(itemValue)}
        style={styles.picker}>
        {zodiacSigns.map(sign => (
          <Picker.Item key={sign} label={sign} value={sign} />
        ))}
      </Picker>
      <MinerdAppButton title="Obtener horóscopo" onPress={getHoroscope} />
      {loading && <ActivityIndicator size="large" style={styles.loading} />}
      {horoscope !== '' && <Text style={styles.horoscope}>{horoscope}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  loading: {
    marginTop: 20,
  },
  horoscope: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default HoroscopeScreen;
