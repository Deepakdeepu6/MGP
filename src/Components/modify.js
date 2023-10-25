import React, { useEffect,useState } from 'react'
import axios from 'axios'
import './modify.css'
import { Posts } from './posts'
import { Paginations } from './Pagination'
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  Modify = () => {

    const [mgpDetails1 , setMGPDetails1] = useState([])
    const [loading , setLoading] = useState(false)
    const [currentPage , setCurrentPage] = useState(1)
    const [postsPerPage , setPostsPerPage] = useState(5)


    const [chosenVal , setChosenVal] = useState('all')
    const paginates = (pageNumber)=>setCurrentPage( pageNumber)
    useEffect(()=>{
        const displayAll = async(e) => {
            try{
                setLoading(true)
                await axios.get("http://localhost:8700/modifies/"+chosenVal).then((response)=>{
                    if(response.data.hasOwnProperty('message')){
                        toast.info("No such details",{autoClose:1000})
                        setMGPDetails1([])
                    }
                    else
                        setMGPDetails1(response.data)

                    console.log(mgpDetails1)
                    setLoading(false)

                //dispatch(addMgp(mgpDetails))
                })
            }
            catch(err){
                console.log(err)
            }
        }
        displayAll();

    },[chosenVal]);

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage 
  const currentPosts = mgpDetails1.slice(indexOfFirstPost , indexOfLastPost)
 
  const [searchBySerialNum,setsearchBySerialNum] = useState('')
  const [filterData,setfilterData] = useState('')
  const [chosenValDate , setChosenValDate] = useState(' ')

  const selectOption = (e) =>{
    setChosenVal(e.target.value)
  }

  const searchByDate =  async (e) =>{
    const getSearchVal = e.target.value
    console.log("get"+getSearchVal.length)

            try{
                console.log("hello")

                await axios.get("http://localhost:8700/modifies/date"+getSearchVal).then((response)=>{
                    setMGPDetails1(response.data)
                    console.log(mgpDetails1)
                    setLoading(false)

                //dispatch(addMgp(mgpDetails))
                })
            }
            catch(err){
                console.log(err)
            }
        

}

  const onSearchSerialNum = async (e) =>{
    const getSearchVal = e.target.value
    console.log(getSearchVal)

    if(getSearchVal.length > 0){
        const getSearchVal = e.target.value
        const searchData = mgpDetails1.filter((item) => item.serialNumber.toLowerCase().includes(getSearchVal))
        setMGPDetails1(searchData)

    }else{
        console.log("hello")

        const displayAll = async(e) => {
            try{
                setLoading(true)
                console.log(chosenVal)
                await axios.get("http://localhost:8700/modifies/"+chosenVal).then((response)=>{
                    setMGPDetails1(response.data)
                    console.log(mgpDetails1)
                    setLoading(false)

                //dispatch(addMgp(mgpDetails))
                })
            }
            catch(err){
                console.log(err)
            }
        }
        displayAll();

    
    }
  }


  return (
    <div className='ModifyTable'>
     <div className='ModifyTableInside mt-3'>
       <div className='detailsTable1'>
       {currentPosts.id!=0 && 

            <div className='buttons'>
                Cleared:
                <select className='form-control form-control-sm  mx-sm-3' name="chosenVal" onChange={selectOption}>
                <option value='all'>
                All
                </option>
                <option value='yes'>
                Yes
                </option>
                <option value='no'>
                No
                </option>
                </select>

             </div>
            }
             <br/>
            <br/>
             <div className='searchBySerialNum'>
              {currentPosts.id!=0 &&
                <input type="text" className='form-control' name="searchBySerialNumber" onChange={onSearchSerialNum} placeholder='SearchBySerialNumber'/>
              }
             </div>
             <br/>

            <Posts posts={currentPosts} loading={loading}/>
        </div>
        <Paginations currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={mgpDetails1.length} paginate={paginates}/>

     </div>
     <ToastContainer/>
    </div>
    
  )
}

export default Modify