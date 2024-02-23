import { useEffect } from "react"
import { FlatList, View ,StyleSheet,Text} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { GlobalStyles } from "../../constants/styles"
import { startRealtimeOrderUpdates } from "../../features/order/orderSlice"
import Card from "./components/Card"

const Order = () =>{
    const orders = useSelector(state => state.orders.orders)
  
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(startRealtimeOrderUpdates())
        
    },[])



return <View style={styles.container}>
    <View style={styles.innerContainer}>
        <Text style={styles.heading}>Shared Product</Text>
    </View>
    <FlatList
    data={orders}
    renderItem={({item}) => <Card type="Order" id={Object.keys(item)[0]} details={item[Object.keys(item)[0]]['productData']} userId={item[Object.keys(item)[0]]['userId']}/>}
    />
</View>
}

export default Order

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:GlobalStyles.colors.primary
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