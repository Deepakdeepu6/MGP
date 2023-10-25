import React,{ useEffect,useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import './modifyComponent.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { convertToDateMonthYear } from '../Utility';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import navigate from 'navigate';
import { BiArrowBack } from "react-icons/bi";
import {
  useNavigate,
} from 'react-router-dom';

export const ModifyComponent = () => {
    const params = useParams();
    const [secondChoice,setSecondChoice]= useState('')
    const[mgpDetails , setMGPDetails] = useState({
      id:0,
        serialNumber:'',
        item:'',
        quantity:0,
        toP:'',
        fromP:'',
        dates:'',
        cleared:' '

    })

  const updateDetails = (e)=>{
    console.log(e.target.name,"+",e.target.value)
    setMGPDetails({...mgpDetails , [e.target.name] : e.target.value})
  }
  const updateFuntion = ()=>{
    console.log(mgpDetails)
        const updates = async(e)=>{
          try{
              await axios.post("http://localhost:8700/updates/",mgpDetails).then((response)=>{
                console.log(response)
                toast.success(response.data.message,{autoClose:1000})


              })
          }
          catch(err){
              console.log("error encountered")
          }
        }
        updates()
  }

    useEffect(()=>{
        const displayOne = async(e) => {
            try{

                await axios.get("http://localhost:8700/modify/"+params.id).then((response)=>{
                  if(response.data[0]!=null)
                   setMGPDetails(response.data[0])
                  console.log(response.data[0])
                  console.log(mgpDetails.dates)
                    if(mgpDetails.cleared == 'no' && mgpDetails.cleared!=' ')
                      setSecondChoice('yes')
                  else
                     setSecondChoice('no')


                //dispatch(addMgp(mgpDetails))
                })
            }
            catch(err){
                console.log(err)
            }
        }
        displayOne();

    },[secondChoice]);
    const navigate = useNavigate();

    const navigateBack = () =>{
      navigate(-1)
    }
    return (
      <div>
      <div className='backArrow'>
      <BiArrowBack className='arr' onClick={navigateBack}/>  

      </div>
      <div className='detailsTable'>


          <div className='detailsTableInside'>

        <table className=' '>
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
            <tr className='table-active' key={mgpDetails?.id}>
            <td><input className="form-control" type="text" defaultValue={mgpDetails.serialNumber} onChange={updateDetails} placeholder=''  name="serialNumber" /></td>
            <td><input className="form-control" type="text" defaultValue={mgpDetails.item} placeholder=''  onChange={updateDetails} name="item" /></td>
            <td><input className="form-control" type="number" defaultValue={mgpDetails.quantity} placeholder='' onChange={updateDetails} name="quantity" /></td>
            <td><input className="form-control" type="text" defaultValue={mgpDetails.dates} placeholder='' onChange={updateDetails} name="dates" /></td>
            <td><input className="form-control" type="text" defaultValue={mgpDetails.fromP} placeholder='' onChange={updateDetails} name="toP" /></td>
            <td><input className="form-control" type="text" defaultValue={mgpDetails.toP} placeholder='' onChange={updateDetails} name="fromP" /></td>
                <td>
                <select className='form-control' onChange={updateDetails} name="cleared" >
                  
                    <option  defaultValue={mgpDetails.cleared} >{mgpDetails.cleared}</option>
                    <option  defaultValue={secondChoice}>{secondChoice}</option>


                </select>
                </td>
                </tr>
        </table>
        <div className='button_classname mt-2'>
        <button className='btn btn-outline-info btn-block btn-lg ' onClick={updateFuntion}>Update</button>
      </div>
    </div>
    <ToastContainer/>

    </div>
</div>
  )
}
