import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../storage/storage'
import Auth from './Auth'
import BottomTab from './BottomTab'
const CustomNavigator = () =>{

    const [userDetail,setUserDetail] =  useState(null)
    const user = useSelector(state => state.user.userDetail)
    console.log(user,userDetail)
    useEffect(()=>{
        async function getUserData(){
            let data = await getUser()
            console.log(data)
            setUserDetail(data)

        }
        getUserData()
    },[])
   
return <>
        {userDetail===null || user===null    ? <Auth/>:<BottomTab/>}
</>
}

export default CustomNavigator