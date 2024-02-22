import { useNavigation } from "@react-navigation/native"
import { View,StyleSheet,Image,Text, Pressable } from "react-native"
import { Popover } from "react-native-popable"
import { GlobalStyles } from "../../../constants/styles"

const Card = ({details:{productName,productPrice,productImg,productQty},id,type}) =>{
  
    const navigation = useNavigation()
    

    const onPressHandler = () =>{
        
        if(type==="Order"){
            navigation.navigate("SharedProductDetail",{id,productName,productPrice,productImg,productQty})
        }else{
            navigation.navigate('ProductDetail',{id,productName,productPrice,productImg})
        }

    }
   
    if(productQty === 0 )return null

return <Pressable onPress={onPressHandler}>
    <View style={styles.container}>
        <Popover content="See profile" action="hover" strictPosition={true} position="left">
        <Image
        source={{uri:productImg}}   
        style={styles.image} 
        />
        </Popover>
        <Text style={styles.txtStyle}>{productName}</Text>
        <Text style={styles.txtStyle}>Rs.{productPrice}</Text>
        <Text style={styles.txtStyle}>Qty:- {productQty}</Text>
</View>
</Pressable>

}

export default Card

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:10,
        marginHorizontal:5,
        marginVertical:5,
        backgroundColor: GlobalStyles.colors.accent500,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
    },
    image:{
        width:100,
        height:120,
        borderRadius:10
    },
    txtStyle:{
        fontSize:20,
        color:GlobalStyles.colors.primary
    }
})