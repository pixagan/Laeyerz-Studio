import React , { useState, useEffect,} from 'react'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { LOAD_DATAPAD } from '../../constants/dataviewConstants'
import { Table, Row, Col, Card, Button, Form, InputGroup, ListGroup} from 'react-bootstrap'

import DocumentView from './DocumentView'
import ChunkView from './ChunkView'

import DataStart from './DataStart'

import {Check } from 'lucide-react';


export const DataPad = ({}) => {


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

        // const text = [
        //     {type: 'text', text: 'This is a test text'},
        //     {type: 'text', text: 'This is a test text'},
        //     {type: 'text', text: 'This is a test text'},
        //     {type: 'text', text: 'This is a test text'},
        //     {type: 'text', text: 'This is a test text'},
        // ]
        
        // setDataPage(text)
        
    }, [])





    return (

        <>

           <div>
             
            
                    
                <Row>
                    <Col>
                        <DocumentView />
                    </Col>
                    <Col>
                        <ChunkView />
                    </Col>
                </Row>

           </div>
        
        </>

    )
}


export default DataPad
