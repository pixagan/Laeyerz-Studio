import React , { useState, useEffect,} from 'react'
import {  Card, Button, Form, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { LOAD_DATAPAD } from '../../constants/dataviewConstants'


import {Check } from 'lucide-react';


export const DocumentPage = ({text_in}) => {



    const [text, setText] = useState(' ')



    const dispatch = useDispatch()




    const autoResizeTextArea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    

    
    useEffect(() => {

        
        setText(text_in)

      
        
    }, [text_in])





    return (

        <>

         
               

                <div style={{padding:'20px', paddingTop:"0px", maxHeight:"95vh", overflowY:"scroll"}}>

                 
                    <>

                  
                        <Form.Control as='textarea' placeholder='Enter Text' rows={50} value={text} 
                            onChange={(e) => {setText(e.target.value); autoResizeTextArea(e);}} style={{backgroundColor:'white'}}> 
                        </Form.Control>



                        {/* <Button style={{backgroundColor:'#00bdee', color:'white', width:'10vw', borderRadius:'10px', padding:"5px"}} bg='#ebdc0c' onClick={()=>addItemRequest()}>
                            <Check size={30} color="white"/>
                        </Button> */}
                       
                    </>
              

             
              


            

                </div>


   
        
        </>

    )
}


export default DocumentPage
