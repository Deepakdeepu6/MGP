import { useState } from "react"
const initialState ={
serialNumber:'',
item:'',
quantity:0,
date:'',
to:'',
from:'',
cleared:'no'

}
const ADD_MGP ='ADD_MGP'
const reducer = (state=initialState , action) =>{

    switch(action.type){
        case ADD_MGP:
            return{
                ...state,
                initialState: action.payload
            }   
            default:return state
                
        }
    }



export default reducer