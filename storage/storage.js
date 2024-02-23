import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

export const AddUser = async (userId,email,username) => {

    try {
        let respone = await AsyncStorage.setItem("userDetail",JSON.stringify({userId,email,username}))
        return "User Added in Local Storage"
    } catch (error) {
        Alert.alert("Error",error)
    }
}

export const getUser = async () =>{
  
    try {
        let response = await AsyncStorage.getItem("userDetail")
        return JSON.parse(response)
    } catch (error) {
        Alert.alert("Error",error)
    }
}


export const logout = async ()=>{
    try {
        await AsyncStorage.removeItem("userDetail");
        console.log('Data removed')
    }
    catch(error) {
        Alert.alert("Error",error)
    }
}
