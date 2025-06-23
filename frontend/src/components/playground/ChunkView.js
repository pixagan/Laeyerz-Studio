import React , { useState, useEffect,} from 'react'
import {  Card, Button, Form, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { LOAD_DATAPAD } from '../../constants/dataviewConstants'


import {Check } from 'lucide-react';


export const ChunkView = ({}) => {


    const [documentTitle, setDocumentTitle] = useState("Document Title") 
    const [courseDescription, setCourseDescription] = useState("") 
    const [datapage, setDataPage] = useState([])

    const [viewUpload, setViewUpload] = useState(false)
    const [viewLearn, setViewLearn] = useState(false)

    const [text, setText] = useState(' ')

    const [viewMode, setViewMode] = useState("text")

    const [fileContent, setFileContent] = useState("");

    const dispatch = useDispatch()

    const { datapadPages, datapadChunks } = useSelector(state => state.datapadR)


  

    const addItemRequest = () => {

    }

    const loadDataSource = async() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }

        try{

            const url = "/api/playground/datasource"
            const {data} = await axios.get(url, config)
            console.log(data)
            dispatch({type: LOAD_DATAPAD, payload: data})

        }catch(error){
            console.log(error)
        }

    }



    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileContent(event.target.result); // Store file content
            };
            reader.readAsText(file); // Reads file as text
        }
    };
    

    const loadDataPad = async() => {

        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }

        try{

            const url = "/api/playground/datapad"
            const {data} = await axios.get(url, config)
            console.log(data)
            dispatch({type: LOAD_DATAPAD, payload: data.datapad})

        }catch(error){
            console.log(error)
        }

    }


    const processDataPad = async() => {

        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }

        try{

            const url = "/api/playground/datapad/process"
            const {data} = await axios.get(url, config)
            console.log(data)
            dispatch({type: LOAD_DATAPAD, payload: data})

        }catch(error){
            console.log(error)
        }

    }


    const autoResizeTextArea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    

    
    useEffect(() => {

        const text = [
            {type: 'text', text: 'This is a test text'},
            {type: 'text', text: 'This is a test text'},
            {type: 'text', text: 'This is a test text'},
            {type: 'text', text: 'This is a test text'},
            {type: 'text', text: 'This is a test text'},
        ]
        
        setDataPage(text)
        
    }, [])





    return (

        <>

           <div>
                <p className="h1">Chunks</p>

              

                <div style={{padding:'20px', maxHeight:"95vh", overflowY:"scroll"}}>

                    {viewLearn && (
                        <>
                        <Card style={{padding:'10px', border:"None"}}>
                <p className='h5'> Data is loaded into a DataPad. Clean and process your data to make it ready for vectorization.</p>

                <img src={'/images/Indexing_text.png'} alt="DataPad" style={{width:'60%'}}/>
                </Card>
                        
                        
                        </>
                    )}

                {viewUpload && (


                        <>

                        <Form.Group controlId="formFile" className="mt-3">
                                                                <Form.Label>Upload File</Form.Label>
                                                            <Form.Control type="file" onChange={handleFileChange} />
                                                            </Form.Group>

                        <Button onClick={()=>loadDataSource()} style={{paddingTop:"2px", paddingBottom:"2px"}}>Load Data</Button>


                        </>
             

                )}


                {viewMode == "input" && (
                    <>

                  
                    <Form.Control as='textarea' placeholder='Enter Text' rows={5} value={text} 
                    onChange={(e) => {setText(e.target.value); autoResizeTextArea(e);}} style={{backgroundColor:'white'}}> 
                    </Form.Control>



                    <Button style={{backgroundColor:'#00bdee', color:'white', width:'10vw', borderRadius:'10px', padding:"5px"}} bg='#ebdc0c' onClick={()=>addItemRequest()}>
                        <Check size={30} color="white"/>
                        
                    </Button>
                        </>
                )}

                

                


            
                   <>
                   {datapadChunks.map((citem, index) => (
                    <>
                    {citem.map((item, index) => (
                     <p>{item}</p>
                    ))}
                     <hr />
                    </>
                       
                   
                ))}
                   
                   </>
                    
                  

                </div>


           </div>
        
        </>

    )
}


export default ChunkView
