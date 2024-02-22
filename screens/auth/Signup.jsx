import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
    Alert,
    Image,
    Button,
    ScrollView,
  } from "react-native";
  import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { signup } from "../../API/auth";
import { addProduct } from "../../API/product";
  
  const Signup = () => {
    // state management
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation()
  

    useEffect(()=>{
      // addProduct("Tshirts",200,15,"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VCUyMHNoaXJ0c3xlbnwwfHwwfHx8MA%3D%3D")
      // addProduct("Pants",1500,100,"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFudHN8ZW58MHx8MHx8fDA%3D")
      // addProduct("Kurta",2500,35,"https://images.unsplash.com/photo-1597983073750-16f5ded1321f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a3VydGF8ZW58MHx8MHx8fDA%3D")
      // dispatch(fetchProducts())
    },[])


      // function for handling User Registeration
      const handleRegister = async () => {
  
        if(name.length==0){
          Alert.alert("Name","Please Fill the Name Field")          
        }
        else if(email.length===0){
          Alert.alert("Email","Please Fill the Email Field")
        }else if(password.length==0){
          Alert.alert("Password","Please Fill the Password")
        }else{
          const res =    await signup(name,email,password) 
          if(res==='User Added Successfully'){
            Alert.alert("Message","Congratulation, You're Successfully Added, Please Login Now",[{text:"OK",onPress:()=>navigation.navigate('Login')}])
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
  
            <Text style={styles.textStyle}>Register</Text>
  
            <Text style={[styles.textStyle, { marginTop: 15, color: "#f3f1f1" }]}>
              Register To your Account
            </Text>
          </View>
  
          <View style={{ marginTop: 50 }}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.textField}>Name</Text>
  
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                style={[styles.textInput, { fontSize: name ? 16 : 14 }]}
                placeholderTextColor={"gray"}
                placeholder="Enter your name"
              />
            </View>
  
            <View>
              <Text style={styles.textField}>Email</Text>
  
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={[styles.textInput, { fontSize: email ? 16 : 14 }]}
                placeholderTextColor={"gray"}
                placeholder="Enter Your Email!"
              />
            </View>
  
            <View style={{ marginTop: 10 }}>
              <Text style={styles.textField}>Password</Text>
  
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={[styles.textInput, { fontSize: password ? 16 : 14 }]}
                placeholderTextColor={"gray"}
                placeholder="Enter your password here!"
              />
            </View>
  
        
  
            <Pressable
              onPress={handleRegister}
              style={styles.registerButton}
            >
              <Text style={styles.buttonTextStyle}>Register</Text>
            </Pressable>
  
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={{ marginTop: 15 }}
            >
              <Text style={styles.loginUser}>
                Already Have an account? Sign in
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      
      </View>
      </ScrollView>
    );
  };
  export default Signup;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: GlobalStyles.colors.primary500,
      padding: 10,
      alignItems: "center",
  
    },
    header: {
      // marginTop: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    textStyle: {
      color: GlobalStyles.colors.accent500,
      fontSize: 17,
      fontWeight: "600",
    },
    textField: {
      fontSize: 18,
      fontWeight: "600",
      color: "#FFF",
    },
    textInput: {
      borderBottomColor: "gray",
      borderBottomWidth: 1,
      marginVertical: 10,
      width: 300,
      color: "#FFF",
    },
    registerButton: {
      width: 200,
      backgroundColor: GlobalStyles.colors.accent500,
      padding: 15,
      marginTop: 50,
      marginLeft: "auto",
      marginRight: "auto",
      borderRadius: 6,
    },
    loginUser: {
      textAlign: "center",
      color: "#FFF",
      fontSize: 16,
      fontWeight: "600",
    },
    imageStyle: {
      // marginLeft: "5%",
      width: "80%",
      // aspectRatio: 6, // Adjust the aspect ratio based on the image's original aspect ratio
    },
    buttonTextStyle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
    imgFile:{
      width:200,
      height:200,
      marginBottom:20,
      borderRadius:100,
      marginLeft:40
  }
  });
  