import axios from 'axios'
import React , { useState, useEffect,} from 'react'
import { Table, Row, Col, Card, Button, Form, InputGroup, ListGroup} from 'react-bootstrap'
import DataPad from './DataPad'
import ChunkView from './ChunkView'
import { useDispatch, useSelector } from 'react-redux'

import { SEARCH_VECTOR_STORE } from '../../constants/vectorStoreConstants'

import StoreProperties from '../vectorstore/StoreProperties'




export const VectorStoreComponent = ({ }) => {


    const dispatch = useDispatch()

    const vectorStoreSearchR = useSelector(state => state.vectorStoreSearchR)
    const { vectorStoreResults } = vectorStoreSearchR

    const [viewLearn, setViewLearn] = useState(false)

    const [courseTitle, setCourseTitle] = useState("") 

    const [text, setText] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const [vectorStoreSelect, setVectorStoreSelect] = useState('Faiss')
    const [viewMode, setViewMode] = useState('Retrieve')

    const [vectorStoreData, setVectorStoreData] = useState([])

    const [embeddingModel, setEmbeddingModel] = useState('Huggingface')


    const  searchVectorStore = async() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }

        try{
            const url = "/api/playground/vectorstore/search"
            const {data} = await axios.post(url, {searchQuery}, config)
            console.log(data)
            dispatch({type: SEARCH_VECTOR_STORE, payload: data})

        }catch(error){
            console.log(error)
        }

    }




    const addtoVectorStore = async() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }

        try{
            const url = "/api/playground/vectorstore/store"
            const {data} = await axios.post(url, {}, config)
            console.log(data)

        }catch(error){
            console.log(error)
        }

    }





    const autoResizeTextArea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    const data = [
        {
            distance: 0.1,
            text: 'text',
            metadata: {'metadata': 'metadata'},
            vector: [0.1, 0.2, 0.3]
        },
        {
            distance: 0.2,
            text: 'text',
            metadata: {'metadata': 'metadata'},
            vector: [0.1, 0.2, 0.3]
        },
        
    ]   

    
    useEffect(() => {
        
        
    }, [])



    return (

        <>

            <p className='h1'>Vector Store</p>

            <div style={{padding:'10px'}}>
            <ListGroup horizontal>
                <ListGroup.Item onClick={()=>setViewLearn(!viewLearn)}>Learn</ListGroup.Item>
                <ListGroup.Item onClick={()=>setVectorStoreSelect('Faiss')} style={{backgroundColor:vectorStoreSelect == 'Faiss' ? '#d9dede' : 'white'}}>
                    Faiss
                </ListGroup.Item>
                {/* <ListGroup.Item onClick={()=>setVectorStoreSelect('Pinecone')} style={{backgroundColor:vectorStoreSelect == 'Pinecone' ? '#d9dede' : 'white'}}>    
                    Pinecone
                </ListGroup.Item>
                <ListGroup.Item onClick={()=>setVectorStoreSelect('Chroma')} style={{backgroundColor:vectorStoreSelect == 'Chroma' ? '#d9dede' : 'white'}}>
                    Chroma
                </ListGroup.Item> */}
            </ListGroup>

            </div>

           


            <div style={{padding:'10px'}}>

                <ListGroup horizontal>
                    <ListGroup.Item onClick={()=>setViewMode('Properties')} style={{backgroundColor:viewMode == 'Properties' ? '#d9dede' : 'white'}}> 
                        Properties
                    </ListGroup.Item>
                    <ListGroup.Item onClick={()=>setViewMode('Store')} style={{backgroundColor:viewMode == 'Store' ? '#d9dede' : 'white'}}> 
                        Store
                    </ListGroup.Item>
                    <ListGroup.Item onClick={()=>setViewMode('Retrieve')} style={{backgroundColor:viewMode == 'Retrieve' ? '#d9dede' : 'white'}}>    
                        Retrieve
                    </ListGroup.Item>
                </ListGroup>
                
            </div>

            {viewLearn && (
                <div>
                    <p>Learn</p>
                    <Card style={{padding:'10px', border:"None"}}>
                <p className='h5'>
                    Vector Stores
                </p>
                <img src={'/images/VectorStore.png'} alt="DataPad" style={{width:'60%'}}/>
                </Card>
                </div>
            )}



            {viewMode == 'Store' && (

                <div>
                    <Card style={{marginBottom:'10px'}}>
                        <Card.Header>
                            <p className="h5">Embedding Model</p>
                            <ListGroup horizontal>
                                <ListGroup.Item onClick={()=>setEmbeddingModel('Huggingface')} style={{backgroundColor:embeddingModel == 'Huggingface' ? '#d9dede' : 'white'}}>Huggingface</ListGroup.Item>
                                <ListGroup.Item onClick={()=>setEmbeddingModel('OpenAI')} style={{backgroundColor:embeddingModel == 'OpenAI' ? '#d9dede' : 'white'}}>OpenAI</ListGroup.Item>
                                <ListGroup.Item onClick={()=>setEmbeddingModel('Anthropic')} style={{backgroundColor:embeddingModel == 'Anthropic' ? '#d9dede' : 'white'}}>Anthropic</ListGroup.Item>
                                
                            </ListGroup>

                        </Card.Header>
                        <Card.Header>
                            <p className="h5">Model Parameters</p>

                            <Button onClick={()=>addtoVectorStore()}>Store</Button>
                            

                        </Card.Header>
                    </Card>

                    <Row>
                        <Col style={{padding:'10px', border:'1px solid grey', minHeight:'99vh'}}>
                            <ChunkView />

                        </Col>
                        <Col style={{padding:'10px', border:'1px solid grey', minHeight:'99vh'}}>
                            <p className="h5">Vectorized</p>
                        </Col>
                    </Row>

                </div>

            )}

            {viewMode == 'Retrieve' && (

                <div>
                    <p>Retrieve</p>

                    <Card>
                <Card.Header>

                    <InputGroup>
                    <Form.Control as='textarea' placeholder='Query' value={searchQuery}  onChange={(e) => {setSearchQuery(e.target.value); autoResizeTextArea(e);}}
                style={{backgroundColor:'white'}}> 
                </Form.Control>

                <Button onClick={()=>searchVectorStore()}>
                    Search
                </Button>
                    </InputGroup>
                

                </Card.Header>
            </Card>


            <Table>
                <thead> 
                    <tr>
                        <th>S No</th>
                        <th>Metadata</th>
                        <th>Distance</th>
                        {/* <th>MetaData</th>
                        <th>Vector</th> */}
                    </tr>
                </thead>

                {vectorStoreResults.map((item, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td><div style={{maxHeight:'200px', overflow:'scroll', padding:"0px", margin:"0px"}}>{JSON.stringify(item.metadata)}</div></td>
                        <td>{item.score}</td>
                    </tr>
                ))}
                
                
                
            </Table>
                </div>

            )}
            

            {viewMode == 'Properties' && (
                <StoreProperties />
            )}

           




        
        </>

    )
}


export default VectorStoreComponent
