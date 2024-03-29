import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    userDetail:null
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state,action) =>{
            state.userDetail = {userId:action.payload.item,username:action.payload.res.username,email:action.payload.res.email}
        },
        removeUser:(state,action) =>{
            state.userDetail=null
        }

    }
})

export const {addUser,removeUser} = userSlice.actions
export default userSlice.reducer