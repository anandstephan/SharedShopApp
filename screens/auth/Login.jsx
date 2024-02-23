import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
  } from "react-native";
  import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";
import { login } from "../../API/auth";
import { AddUser } from "../../storage/storage";
import { addUser } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

 
  const Login = () => {
    // state manangement
    const dispatch = useDispatch()
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()

    const handleLogin = async () => {
        if(email.length===0){
          Alert.alert("Email","Please Fill the Email Field")
        }else if(password.length==0){
          Alert.alert("Password","Please Fill the Password")
        }else{
          const res = await login(email,password)
          if(res.msg === "Invalid Login"){
             Alert.alert("Message",res.msg);
          }else if(res.msg === "You're Successfully Login"){
             Alert.alert("Message",res.msg);

             AddUser(res.loginDetail.item,email,res.loginDetail.res.username)
            dispatch(addUser(res.loginDetail))
            }
        }

    };
  
    return (
      <ScrollView style={{backgroundColor:GlobalStyles.colors.primary500}}>
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.header}>
            <Image
              source={require("../../images/newlogo.png")}
              style={styles.imageStyle}
              resizeMode="contain"
            />
  
            <Text style={styles.textStyle}>Sign In</Text>
  
            <Text
              style={[
                styles.textStyle,
                { color: "#f3f1f1", marginTop: 15, fontSize: 16 },
              ]}
            >
              Sign In to your Account
            </Text>
          </View>
  
          {/* View for the form */}
          <View style={styles.formStyle}>
            {/* View holding email and textInput for email */}
            <View>
              <Text style={styles.textField}>Email</Text>
  
              <TextInput
                value={email}
                onChangeText={(email) => setEmail(email)}
                placeholder="Enter your Email id"
                placeholderTextColor={"gray"}
                style={[styles.textInputStyle, { fontSize: email ? 16 : 14 }]}
              />
            </View>
  
            {/* View holding password and textInput for password */}
            <View style={{ marginTop: 30 }}>
              <Text style={styles.textField}>Password</Text>
  
              <TextInput
                value={password}
                onChangeText={(password) => setPassword(password)}
                placeholder="Enter your Password"
                placeholderTextColor={"gray"}
                secureTextEntry
                style={[styles.textInputStyle, { fontSize: password ? 16 : 14 }]}
              />
            </View>
  
            {/* Button for Login */}
            <Pressable style={styles.buttonStyle} onPress={handleLogin}>
              <Text style={styles.buttonTextStyle}>Login</Text>
            </Pressable>
  
        
            <Pressable
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.registerUserStyle}>
                Don't have an account? Sign Up
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
      </ScrollView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: GlobalStyles.colors.primary500,
      padding: 10,
      alignItems: "center",
     
    },
    header: {
      marginTop: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: {
      marginTop: 30,
      color: GlobalStyles.colors.accent500,
      fontSize: 19,
      fontWeight: "600",
    },
    imageStyle: {
      width: "40%",
      aspectRatio: 1, // Adjust the aspect ratio based on the image's original aspect ratio
    },
    formStyle: {
      marginTop: 40,
    //   backgroundColor: '#333', // Set a background color for the form container
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    textField: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 10, // Add margin-bottom to separate text from TextInput
    },
    textInputStyle: {
      borderBottomColor: "#FFF",
      borderBottomWidth: 1,
      marginVertical: -5,
      width: 300,
      padding: 2,
      color: "white",
    },
    buttonStyle: {
      width: 200,
      backgroundColor: GlobalStyles.colors.accent500,
      padding: 15,
      marginTop: 60,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonTextStyle: {
      fontSize: 16,
      color: "white",
      fontWeight: "700",
      textAlign: "center",
    },
 
    registerUserStyle: {
      color: "#FFF",
      fontSize: 15,
      fontWeight: "600",
      // textAlign : 'center'
    //   marginLeft: "10%",
    marginTop:20

    },
  });
  