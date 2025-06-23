import React , { useState, useEffect,} from 'react'
import {  Card, Button, Form, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { LOAD_DATAPAD } from '../../constants/dataviewConstants'

import {DocumentPage} from './DocumentPage'
import {Check } from 'lucide-react';


export const DocumentView = ({}) => {


    const [documentTitle, setDocumentTitle] = useState("Document Title") 
    const [courseDescription, setCourseDescription] = useState("") 
    const [datapage, setDataPage] = useState([])

    const [document, setDocument] = useState(null);
  const [document_name, setDocumentName] = useState('');

    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const [viewUpload, setViewUpload] = useState(false)
    const [viewLearn, setViewLearn] = useState(false)

    const [viewProcessing, setViewProcessing] = useState(false)

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


    const handleChange = (e) => {
        setFile(e.target.files[0]);
        setStatus('');
      };

    
    const handleUpload = async () => {
        if (!file) return;
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          setStatus('Uploading...');
          const {data} = await axios.post('/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          setStatus('Upload successful!');
          setDocument(data.pages);
          setDocumentName(data.filename);
          console.log(data)
        dispatch({type: LOAD_DATAPAD, payload: data})
        } catch (err) {
          setStatus('Upload failed.');
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



    const clearDataPad = async() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }

        const url = "/api/playground/datapad/clear"
        const {data} = await axios.get(url, config)
        console.log(data)
        dispatch({type: LOAD_DATAPAD, payload: data})
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
                <p className="h1">Document</p>

                <ListGroup horizontal>
                   
                    <ListGroup.Item onClick={()=>setViewUpload(!viewUpload)}>Upload</ListGroup.Item>
                    <ListGroup.Item onClick={()=>setViewProcessing(!viewProcessing)}>Split</ListGroup.Item>
                    <ListGroup.Item onClick={()=>processDataPad()}>Clear</ListGroup.Item>
                    {/* <ListGroup.Item onClick={()=>setViewMode("input")}>Input</ListGroup.Item> */}
                    {/* <ListGroup.Item onClick={()=>setViewMode("text")}>Text View</ListGroup.Item> */}
                    {/* <ListGroup.Item onClick={()=>setViewMode("chunks")}>Chunk View</ListGroup.Item> */}
                    {/* <ListGroup.Item onClick={()=>setViewMode("chunks")}>Memory</ListGroup.Item> */}
                </ListGroup>

                    
                <ListGroup horizontal>
                    {/* <ListGroup.Item onClick={()=>loadDataPad()}>Load</ListGroup.Item> */}
                    
                </ListGroup>


                {viewUpload && (


                        <>

                <h2>Upload a File</h2>
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload} disabled={!file}>Upload</button>
                <p>{file && `Selected: ${file.name}`}</p>
                <p>{status}</p> 

                        {/* <Form.Group controlId="formFile" className="mt-3">
                                                                <Form.Label>Upload File</Form.Label>
                                                            <Form.Control type="file" onChange={handleFileChange} />
                                                            </Form.Group>
                                                            */}

                        {/* <Button onClick={()=>loadDataSource()} style={{paddingTop:"2px", paddingBottom:"2px"}}>Load Data</Button>  */}


                        </>
             

                )}



             

                    {viewProcessing && (
                        <Card>
                            <Card.Body> 

                            <Button onClick={()=>processDataPad()}>Split</Button>
                            </Card.Body>
                    </Card>

                    )}
                    





                    {datapadPages.map((item, index) => (
                    <>


                        {item.datatype == 'text' && (
                            <DocumentPage text_in={item.data}/>
                            // <p>{item.data}</p>
                        )}

                    </>
                ))}
                    
                    
                

                


            

         


           </div>
        
        </>

    )
}


export default DocumentView
