import { useRoute } from '@react-navigation/native'
import { useEffect,useState } from 'react'
import {View,StyleSheet,Image,Text, Pressable} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import shortid from 'shortid'
import { addOrder, checkUserAlreayOrderOrNot, updateProduct } from '../../API/order'
import { GlobalStyles } from '../../constants/styles'
import { startRealtimeUpdates } from '../../features/product/productSlice'
import {startRealtimeOrderUpdates} from '../../features/order/orderSlice'

import { getUser } from '../../storage/storage'

const SharedProductDetail =  () =>{

    const route = useRoute()
    const [userDetail,setUserDetail ]= useState('')

useEffect(()=>{
    async function getUserData(){
        let data = await getUser()
        console.log("lll",data)
        setUserDetail(data.userId)
    }
    getUserData()
},[])

    const data = useSelector(state => state.orders.orders)
    const allProduct = useSelector(state=>state.products.products)
    

    const item1 = data.filter(item => Object.keys(item)[0]===route.params.id)
    let orderProductDetail = item1[0][Object.keys(item1[0])].productData
    
    let orderProductName = item1[0][Object.keys(item1[0])].productData.productName
    const onlyItem1 = allProduct.filter(item => item[Object.keys(item)[0]].productName === orderProductName)
    const productDetail1 = onlyItem1[0][Object.keys(onlyItem1[0])]
    

    const dispatch = useDispatch()
    const onPressHandler =async () =>{
        try {
            const item = data.filter(item => Object.keys(item)[0]===route.params.id)
           
            if(item.length!==0){
                let orderProductName = item[0][Object.keys(item[0])].productData.productName
                const onlyItem = allProduct.filter(item => item[Object.keys(item)[0]].productName === orderProductName)
               
                const productId = Object.keys(onlyItem[0])[0]
               
                const productDetail = onlyItem[0][Object.keys(onlyItem[0])]
                productDetail.productQty--
             
               await updateProduct(productId,productDetail)
                const userDetail= await getUser()//please check it first
                let userId = userDetail.userId
                
             const updateProductItem = await checkUserAlreayOrderOrNot(userId,productDetail.productName)
                
                
             if(updateProductItem === "No New Element"){
                productDetail.productQty=1
                addOrder(shortid.generate(),userId,productDetail)            
             }
             else if(updateProductItem){
                updateProductItem.productDetail.productData.productQty +=1
                addOrder(updateProductItem.orderId,userId,updateProductItem.productDetail.productData)
             }else{
                productDetail.productQty = 1
                addOrder(shortid.generate(),userId,productDetail)
             }
             console.log("order clicked")
            }
     


        } catch (error) {
            // console.log(getProductDetail,error,productId)
            console.log("error",error)
        }


    }

    useEffect(()=>{
        dispatch(startRealtimeUpdates())
        dispatch(startRealtimeOrderUpdates())
    },[])

    // return <View></View>

    return <View style={styles.container}>
            <Image
            source={{uri:route.params.productImg}}
            style={styles.image}
           />
           <Text style={styles.heading}>Total Qty -:{productDetail1.productQty}</Text>
            {/* <Text style={styles.heading}>{orignialProduct[0][Object.keys(orignialProduct[0])].productData.productQty}</Text> */}
           <Text style={styles.heading} >{route.params.userId === userDetail? "Your Item":"Friend Item"} {orderProductDetail.productQty}</Text>
           <Text style={styles.heading}>{route.params.productName}</Text>
           <Text style={[styles.heading,styles.price]}>Rs. {route.params.productPrice}</Text>
           <View  style={[styles.txtStyle]}>
           <Text  style={[styles.heading,styles.txtStyle2]}>Very Good Tshirt Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus iste quae fuga id nostrum? Minus earum sit, eligendi asperiores blanditiis quos molestiae aperiam temporibus pariatur animi accusamus quia consequatur? Voluptas?</Text>
           </View>
            {
                route.params.userId === userDetail ?   <Pressable style={styles.btnContainer} onPress={onPressHandler}>
                <Text style={styles.btnTxt}>Order Now</Text>
               </Pressable>:null
            }
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:GlobalStyles.colors.primary
      
    },
    image:{
        // marginTop:20,
        width:'100%',
        height:300
    },
    btnContainer:{
        backgroundColor:GlobalStyles.colors.accent500,
        padding:20,
        borderRadius:15
    },
    btnTxt:{
        color: '#FFF'
     } ,
     price:{
         fontSize:20
     },
     txtStyle2:{
         fontSize:12,
         letterSpacing:2
     },
     txtStyle:{
     marginHorizontal:10,
     alignItems:"center",
     padding:10
     },
     heading:{
         fontSize:30,
         fontWeight:"bold",
         justifyContent:"center",
         alignItems:"center",
         color:GlobalStyles.colors.accent500
     }
})

export default SharedProductDetail