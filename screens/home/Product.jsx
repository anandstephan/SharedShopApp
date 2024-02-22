import { useEffect } from "react"
import {  View,FlatList,StyleSheet,Text } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { GlobalStyles } from "../../constants/styles"
import { startRealtimeUpdates } from "../../features/product/productSlice"
import Card from "./components/Card"

const Product = () =>{
    const  dispatch = useDispatch()
    const user = useSelector(state => state.products.products)
   
    useEffect(()=>{
        dispatch(startRealtimeUpdates())
    },[])
    return <View style={styles.container}>
        <View style={styles.innerContainer}>
        <Text style={styles.heading}>All Products</Text>
        </View>
        <FlatList
        data={user}
        keyExtractor={(item) =>Object.keys(item)[0] }
        renderItem={({item}) => <Card id={Object.keys(item)[0]} details={item[Object.keys(item)[0]]}/>}
        />

    </View>
}

export default Product

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:GlobalStyles.colors.primary,
        justifyContent:"center",

    },
    innerContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    heading:{
        fontSize:30,
        fontWeight:"bold",
        justifyContent:"center",
        alignItems:"center",
        color:GlobalStyles.colors.accent500
    }
})