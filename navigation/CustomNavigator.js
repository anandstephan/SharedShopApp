import { useSelector } from 'react-redux'
import Auth from './Auth'
import BottomTab from './BottomTab'
const CustomNavigator = () =>{
    const userDetail = useSelector(state => state.user)
   
return <>
        {userDetail===null ? <Auth/>:<BottomTab/>}
</>
}

export default CustomNavigator