import * as ImagePicker from 'expo-image-picker';

const requestPerms = async () => {
    const cam = await ImagePicker.requestCameraPermissionsAsync();
    const gal = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!cam.granted || !gal.granted) {
        //La alerta se ejecutara
      return false;
    }
    return true;
  };

export const pickFromGallery = async (onChange) => {
    if (!(await requestPerms())) return false;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) onChange(result.assets[0].uri);
  };

export const takePhoto = async (onChange) => {
    if (!(await requestPerms())) return;
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) onChange(result.assets[0].uri);
  };