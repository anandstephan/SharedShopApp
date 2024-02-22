import { createStackNavigator } from '@react-navigation/stack';
import Product from '../screens/home/Product';
import ProductDetail from '../screens/home/ProductDetail';
import SharedProductDetail from '../screens/home/SharedProductDetail';

const Stack = createStackNavigator()

const StackNavigator = () =>{
    return <Stack.Navigator 
            screenOptions={{
                headerShown:false
            }}
        >
          <Stack.Screen name="Product" component={Product}/>
          <Stack.Screen name="ProductDetail" component={ProductDetail}/>
          <Stack.Screen name="SharedProductDetail" component={SharedProductDetail}/>
        
    </Stack.Navigator>
}

export default StackNavigator