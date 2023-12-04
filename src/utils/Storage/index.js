import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../Toast';

export const storeData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    showToast(
      'Gagal menyimpan data di localstorage!',
      'danger',
    );
  }
};

export const getData = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    showToast(
      'Gagal mengambil data dari localstorage!',
      'danger',
    );
  }
};

export const removeItem = async (storageKey) => {
  try {
    const jsonValue = await AsyncStorage.removeItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    showToast(
      'Gagal menghapus data dari localstorage!',
      'danger',
    );
  }
};
