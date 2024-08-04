import {KeyboardTypeOptions, StyleSheet, TextInput} from 'react-native';
import React from 'react';

type Props = {
  value: string;
  setValue: any;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  color: 'red' | 'blue';
};

const MinerdAppInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  keyboardType,
  color,
}: Props) => {
  const borderColor = color === 'red' ? '#dc3545' : '#203c73';

  return (
    <TextInput
      style={[styles.input, {borderColor: borderColor}]}
      placeholder={placeholder}
      value={value}
      onChangeText={setValue}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholderTextColor="black"
    />
  );
};

export default MinerdAppInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});
