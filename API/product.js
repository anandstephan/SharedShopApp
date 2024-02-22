import { database } from "../Config"
import shortid from "shortid"
import { Alert } from "react-native"
export const addProduct = async (productName,productPrice,productQty,productImg)=>{
    try {
        let id = shortid.generate()
        
    //     let newpassword = 
       await database.ref("/products/"+id).set({productName,productPrice,productQty,productImg})
       return "Product Added Successfully"

    } catch (error) {
        Alert.alert("Error",error)
    }
}