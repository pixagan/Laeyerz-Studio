import React , {useEffect, useState, useCallback } from 'react'
import { Row, Col, Button, ListGroup, InputGroup, Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import LLMComponent from '../components/playground/LLMComponent'
import VectorStoreComponent from '../components/playground/VectorStoreComponent'
import DataPad from '../components/playground/DataPad'
import GettingStartedComponent from '../components/playground/GettingStarted'

export const PlaygroundScreen = ({match, history}) => {

    
    const dispatch = useDispatch()

    const [viewMode, setViewMode] = useState('llm')
   
    

    useEffect(() => {
        
   
    }, [])

   

    return(



        <div style={{margin: '20px', marginTop:'1px',padding: '20px', minHeight:'100vh'}}>

           

            <Row>
                <Col style={{maxWidth:'15vw'}}>

                <ListGroup>
                    <ListGroup.Item style={{backgroundColor:'#f5e478'}}>
                        <p className='h4'>Learn</p>
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => setViewMode('gettingStarted')} style={{backgroundColor:viewMode == 'gettingStarted' ? '#d9dede' : 'white'}}>
                        <p className='h5'>Getting Started</p>
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => setViewMode('dataView')} style={{backgroundColor:viewMode == 'dataView' ? '#d9dede' : 'white'}}> 
                        <p className='h5'>Data View</p>
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => setViewMode('vectorStore')} style={{backgroundColor:viewMode == 'vectorStore' ? '#d9dede' : 'white'}}>
                        <p className='h5'>Vector Store</p>
                    </ListGroup.Item>
                    <ListGroup.Item onClick={() => setViewMode('llm')} style={{backgroundColor:viewMode == 'llm' ? '#d9dede' : 'white'}}>
                        <p className='h5'>LLM</p>
                    </ListGroup.Item>
                  
                    
                </ListGroup>
                
                </Col>
                <Col>

                {viewMode == 'gettingStarted' && (
                    <GettingStartedComponent />
                )}
                {viewMode == 'dataView' && (
                    <DataPad />
                )}
                {viewMode == 'vectorStore' && (
                    <VectorStoreComponent />
                )}
                {viewMode == 'llm' && (
                    <LLMComponent />
                )}
              
             
                </Col>
            </Row>


        </div>



    )


}

export default PlaygroundScreen


