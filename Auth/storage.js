import * as SecureStore from "expo-secure-store";

const key = "secondHandUser";

const storeUser = async (user) => {
  try {
    const jsonUser = JSON.stringify(user);
    await SecureStore.setItemAsync(key, jsonUser);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  try {
    const result = await SecureStore.getItemAsync(key);
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};

const removeUser = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

export default { removeUser, getUser, storeUser };
