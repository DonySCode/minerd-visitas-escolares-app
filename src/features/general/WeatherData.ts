export default interface WeatherData {
  location: { name: string };
  current: { temp_c: number; condition: { text: string; icon: string } };
};
