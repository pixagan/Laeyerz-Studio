import React , { useState, useEffect,} from 'react'

import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { LOAD_DATAPAD } from '../../constants/dataviewConstants'
import { Table, Row, Col, Card, Button, Form, InputGroup, ListGroup} from 'react-bootstrap'

import DocumentView from './DocumentView'
import ChunkView from './ChunkView'

import {Check } from 'lucide-react';


export const DataStart = ({}) => {


    const [documentTitle, setDocumentTitle] = useState("Document Title") 
   

    

    
    useEffect(() => {

       
        
    }, [])





    return (

        <>

           <div>
              
                <Card>
                    <Card.Header>
                        <p>Text Input</p>
                    </Card.Header>
                </Card>

                <Card>
                    <Card.Header>
                        <p>File Input</p>
                    </Card.Header>
                </Card>





           </div>
        
        </>

    )
}


export default DataStart
