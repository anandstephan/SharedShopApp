;
import { NavigationContainer } from "@react-navigation/native";

import { Provider } from "react-redux";
import { store } from "./app/store";
import CustomNavigator from './navigation/CustomNavigator'



const App = () =>{


return <NavigationContainer>
      <Provider store={store}>
        <CustomNavigator/>
        </Provider>
    </NavigationContainer>
}

export default App