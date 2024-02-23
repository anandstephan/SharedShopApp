import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GlobalStyles } from '../constants/styles';
import Order from '../screens/home/Order';
import StackNavigator from './StackNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const BottomTab = ()=> {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown:false,
      tabBarStyle:{backgroundColor:GlobalStyles.colors.accent500},
      tabBarLabel:""
    }}
    >
      <Tab.Screen name="Stack" component={StackNavigator}
      
  options={{
    tabBarIcon:(({color,size,focused}) =><Icon name="home" size={size} color={focused ?GlobalStyles.colors.primary:GlobalStyles.colors.primary500} />),
    
  }}
      />
      <Tab.Screen name="Order" component={Order}
      
  options={{
    tabBarIcon:(({color,size,focused}) =>     <Icon2 name="favorite" size={size} color={focused ?GlobalStyles.colors.primary:GlobalStyles.colors.primary500} />),
  }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab