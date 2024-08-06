import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const permissionsMap = {
  android: [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ],
  ios: [
    PERMISSIONS.IOS.CAMERA,
    PERMISSIONS.IOS.MICROPHONE,
    PERMISSIONS.IOS.PHOTO_LIBRARY,
  ],
};

export const requestPermissions = async () => {
  const permissionsToRequest =
    Platform.OS === 'android' ? permissionsMap.android : permissionsMap.ios;

  const checkResults = await Promise.all(
    permissionsToRequest.map(permission => check(permission)),
  );

  const permissionsToRequestNow = permissionsToRequest.filter(
    (_, index) => checkResults[index] !== RESULTS.GRANTED,
  );

  if (permissionsToRequestNow.length > 0) {
    const requestResults = await Promise.all(
      permissionsToRequestNow.map(permission => request(permission)),
    );

    return requestResults.every(result => result === RESULTS.GRANTED);
  }

  return true;
};
