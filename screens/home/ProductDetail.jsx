import { useRoute } from '@react-navigation/native'
import {View,StyleSheet,Image,Text, Pressable} from 'react-native'
import { useSelector } from 'react-redux'
import shortid from 'shortid'
import { addOrder, checkUserAlreayOrderOrNot, updateProduct } from '../../API/order'
import { GlobalStyles } from '../../constants/styles'
import { getUser } from '../../storage/storage'

const ProductDetail = () =>{
    const route = useRoute()

    const data = useSelector(state => state.products.products)
    const onPressHandler =async () =>{
        try {
            const item = data.filter(item => Object.keys(item)[0]===route.params.id)

            const productId = Object.keys(item[0])[0]
        
            const productDetail = item[0][productId]
            productDetail.productQty--
           await updateProduct(productId,productDetail)
            const userId = await getUser().userId//please check it first
            console.log("🚀 ~ onPressHandler ~ userId:", userId)
         const updateProductItem = await checkUserAlreayOrderOrNot(userId,productDetail.productName)
         console.log(updateProductItem)
         if(updateProductItem === "No New Element"){
            productDetail.productQty=1
            addOrder(shortid.generate(),"s8GBhPKG_",productDetail)            
         }
         else if(updateProductItem){
            updateProductItem.productDetail.productData.productQty +=1
            addOrder(updateProductItem.orderId,"s8GBhPKG_",updateProductItem.productDetail.productData)
         }else{
            productDetail.productQty = 1
            addOrder(shortid.generate(),"s8GBhPKG_",productDetail)
         }


        } catch (error) {
            // console.log(getProductDetail,error,productId)
            console.log("error",error)
        }


    }
    return <View style={styles.container}>
            <Image
            source={{uri:route.params.productImg}}
            style={styles.image}
           />
           <Text style={styles.heading}>{route.params.productName}</Text>
           <Text style={[styles.heading,styles.price]}>Rs. {route.params.productPrice}</Text>
           <View style={[styles.txtStyle]}>
           <Text style={[styles.heading,styles.txtStyle2]}>Very Good Tshirt Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus iste quae fuga id nostrum? Minus earum sit, eligendi asperiores blanditiis quos molestiae aperiam temporibus pariatur animi accusamus quia consequatur? Voluptas?</Text>
           </View>
           <Pressable style={styles.btnContainer} onPress={onPressHandler}>
            <Text style={styles.btnTxt}>Order Now</Text>
           </Pressable>
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
        height:300,
        borderRadius:5,
        elevation:4
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

export default ProductDetail