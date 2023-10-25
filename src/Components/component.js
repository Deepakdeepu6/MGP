import React , {useState} from 'react'
import $ from 'jquery';
import { Tabs, Tab } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import Adds from './add'
import Modify from './modify'
import { History } from './history';

import './component.css'
import { useSelector, useDispatch } from 'react-redux'
import { Add } from '@mui/icons-material';


const Compo= ()  => {

  const[eve,setFun] = useState({
      add:1,
      modify:0,
      history:0
  })

  const onclickEventAdd = ()=>{
    setFun({add:1,modify:0,history:0})
    console.log(eve)
  }
  const onclickEventModify = ()=>{
    setFun({add:0,modify:1,history:0})
    console.log(eve)

  }
  const onclickEventHistory = ()=>{
    setFun({add:0,modify:0,history:1})
    console.log("history-------------",eve)

  }
  return (
    <div className='compo'>
      <Tabs className='mb-4'>
        <Tab eventKey="add" title="ADD" onClick={onclickEventAdd}>
          <Adds/>
        </Tab>
        <Tab eventKey="modify" title="MODIFY" onClick={onclickEventModify}>
        <Modify />
        </Tab>
        <Tab eventKey="history" title="HISTORY" onClick={onclickEventHistory}>
        <History status={2}/> 
        </Tab>  
      </Tabs>
      
    </div>
  )
}

export default Compo