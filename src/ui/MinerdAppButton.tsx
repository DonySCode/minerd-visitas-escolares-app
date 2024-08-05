import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Spacer from './spacer/Spacer';

type Props = {
  title: string;
  onPress: () => void;
  color?: string;
};

const MinerdAppButton = ({title, onPress, color = '#203c73'}: Props) => {
  return (
    <Spacer marginVertical={10} width="100%">
      <TouchableOpacity
        style={[styles.loginBtn, {backgroundColor: color}]}
        onPress={onPress}>
        <Text style={styles.loginBtnText}>{title}</Text>
      </TouchableOpacity>
    </Spacer>
  );
};

export default MinerdAppButton;

const styles = StyleSheet.create({
  loginBtn: {
    width: '100%',
    borderRadius: 8,
  },
  loginBtnText: {
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});
