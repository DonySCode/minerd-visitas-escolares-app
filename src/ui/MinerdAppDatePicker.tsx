import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Spacer from './spacer/Spacer';
import DatePicker from 'react-native-date-picker';

type Props = {
  date: Date;
  setDate: any;
};

const MinerdAppDatePicker = ({date, setDate}: Props) => {
  return (
    <Spacer marginVertical={10}>
      <Text style={styles.header}>Fecha</Text>
      <View style={styles.datePickerContainer}>
        <DatePicker date={date} onDateChange={setDate} />
      </View>
    </Spacer>
  );
};

export default MinerdAppDatePicker;

const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  datePickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 20,
  },
});
