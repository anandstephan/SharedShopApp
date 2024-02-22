import { Alert } from "react-native"
import { database } from "../Config"
import shortid from "shortid"

export const signup = async (username,email,password) =>{

    try {
        let id = shortid.generate()
        
    //     let newpassword = 
       await database.ref("/users/"+id).set({username,email,password}) 
       return "User Added Successfully"

    } catch (error) {
        Alert.alert("Error",error)
    }

}

export const login =async (email,password) =>{
    try {
        const response = await database.ref("/users").once("value")
        let loginDetail = ""
        const res =  Object.keys(response.val()).forEach(item => {
            if(response.val()[item]['email'] == email && response.val()[item]['password'] == password){
              
                loginDetail = {res:response.val()[item],item}
            }
        } )
        

        if(loginDetail.length!==0){
            return {loginDetail,msg:"You're Successfully Login"}
        } else{
            return {"msg":"Invalid Login"}
        }
    } catch (error) {
        
    }
}