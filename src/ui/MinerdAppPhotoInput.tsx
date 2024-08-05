import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Spacer from './spacer/Spacer';

import * as ImagePicker from 'react-native-image-picker';

type Props = {
  photo: string;
  setPhoto: any;
};

const MinerdAppPhotoInput = ({photo, setPhoto}: Props) => {
  const pickPhoto = () => {
    ImagePicker.launchCamera(
      {mediaType: 'photo'},
      (response: ImagePicker.ImagePickerResponse) => {
        if (response.assets) {
          setPhoto(response.assets[0]?.uri ?? '');
        }
      },
    );
  };
  return (
    <Spacer marginVertical={8} width="100%">
      <View style={styles.photoContainer}>
        <View>
          <Text style={styles.header}>Foto</Text>
          <Spacer marginVertical={5}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={pickPhoto}
              style={styles.imagePickerBtn}>
              <Text style={styles.imagePickerBtnText}>
                {photo ? 'Actualizar foto' : 'Agregar foto'}
              </Text>
            </TouchableOpacity>
          </Spacer>
        </View>
        {photo && <Image source={{uri: photo}} style={styles.photo} />}
      </View>
    </Spacer>
  );
};

export default MinerdAppPhotoInput;

const styles = StyleSheet.create({
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imagePickerBtn: {
    backgroundColor: 'green',
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  imagePickerBtnText: {
    color: 'white',
    padding: 5,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
