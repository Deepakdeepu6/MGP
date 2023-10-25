import React, { useState } from 'react'
import './add.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addMgp } from '../redux/action';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 const Adds = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const[mgpDetails , setMGPDetails] = useState({
        serialNumber:'',
        item:'',
        quantity:0,
        date:'',
        to:'',
        from:'',
        cleared:'no'

    })

    const onclickAdd = async(e) =>{
        e.preventDefault();
        try{
            await axios.post("http://localhost:8700/add",mgpDetails).then((response)=>{
                console.log("add response",response)
                toast.success(response.data.message,{autoClose:1000})
                let allInputs = document.querySelectorAll('input');
                allInputs.forEach(singleInput => singleInput.value = '');                
                    //dispatch(addMgp(mgpDetails))
            })

        }
        catch(err){
            console.log(err)
        }

    }
const onChangeAdd = (e) =>{
    setMGPDetails({...mgpDetails , [e.target.name]:e.target.value})
    console.log(mgpDetails)
}

  return (
    <div className='AddDetails'>
       <div className='detailsTable'>
            <table className="">
                <thead>
                    <tr>
                    <th scope="col">SERIAL No.</th>
                    <th scope="col">ITEM</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TO</th>
                    <th scope="col">FROM</th>
                    <th scope="col">CLEARED</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-active">
            <td><input  id="cla" className="form-control" type="text"     defaultValue='' placeholder='' onChange={onChangeAdd} name="serialNumber"/></td>
            <td><input className="form-control" type="text" placeholder='' defaultValue='' onChange={onChangeAdd} name="item"/></td>
            <td><input className="form-control" type="number" placeholder='' defaultValue='' onChange={onChangeAdd} name="quantity"/></td>
            <td><input className="form-control" type="date" placeholder=''  defaultValue='' onChange={onChangeAdd} name="date"/></td>
            <td><input className="form-control" type="text" placeholder='' defaultValue=''  onChange={onChangeAdd} name="to"/></td>
            <td><input className="form-control" type="text" placeholder='' defaultValue='' onChange={onChangeAdd} name="from"/></td>
            <td><select className='form-control' name="cleared" onChange={onChangeAdd}>
                <option value="no" >No</option>
                <option value="yes" >Yes</option>
                </select>
            </td>
                    </tr>
                    </tbody>
            </table>
        </div>
        <div>
        <button className = "btn btn-outline-success btn-lg mt-2" onClick={onclickAdd}>ADD</button>

        </div>
        <ToastContainer/>

    </div>

  )
}

export default Adds