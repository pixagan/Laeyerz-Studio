import axios from 'axios'
import React , { useState, useEffect,} from 'react'
import { Row, Col, Card, Button, Form,  OverlayTrigger, Tooltip, InputGroup, ListGroup, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'

import LLMChatItem from '../llm/LLMChatItem'

import { QUERY_LLM } from '../../constants/llmConstants'


export const LLMComponent = ({ }) => {

  

    const dispatch = useDispatch()

    const llmR = useSelector(state => state.llmR)
    const { chats } = llmR

    const [selectedModel, setSelectedModel] = useState("openai")

    const [useMemory, setUseMemory] = useState(false)

   

    const [instruction, setInstruction] = useState('You are a helpful assistant')
    const [text, setText] = useState('')


    const llmRequest = async() => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token}`
            }
        }
        try{

            const url = "/api/playground/llm"

            const prompt = {
                instruction: instruction,
                query: text,
            }


            const useMemoryStr = useMemory ? "Yes" : "No"


            const llm_settings = {
                model: "gpt-4o",
                temperature: 0.5,
                max_tokens: 100,
                top_p: 0.5
            }

            const {data} = await axios.post(url, {prompt, llm_settings, useMemoryStr}, config)
            console.log(data)

            dispatch({
                type: QUERY_LLM,
                payload: data
            })




        }catch(error){
            console.log(error)
        }

    }

    const autoResizeTextArea = (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    


    const exportChats = () => {
        // Convert chats array/object to a JSON string
        const dataStr = JSON.stringify(chats, null, 2); // pretty print with 2 spaces
        // Create a blob of the data
        const blob = new Blob([dataStr], { type: "application/json" });
        // Create a link element
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "chats.json";
        // Append to the document and trigger download
        document.body.appendChild(link);
        link.click();
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }


    
    useEffect(() => {
        
        
    }, [])






    return (

        <>

            <p className='h1'>LLM</p>

            <div style={{padding:'10px'}}>
                <ListGroup horizontal>
                    <ListGroup.Item onClick={()=>setSelectedModel("openai")} style={{backgroundColor: selectedModel == 'openai' ? '#d9dede' : 'white'}}>
                        OpenAI
                    </ListGroup.Item>
                    {/* <ListGroup.Item onClick={()=>setSelectedModel("anthropic")} style={{backgroundColor: selectedModel == 'anthropic' ? '#d9dede' : 'white'}}>
                        Anthropic
                    </ListGroup.Item> */}
                </ListGroup>
            </div>
            


            <Card>
                <Card.Header>
                    Prompt
                </Card.Header>
            </Card>


            <Card>
                <Card.Header>
                    <InputGroup>

                    <Form.Control type='text' placeholder='Instruction' value={instruction} onChange={(e) => setInstruction(e.target.value)} style={{backgroundColor:'white'}}> 
                    </Form.Control>


                    <Button onClick={()=>llmRequest()}>
                        Ask
                    </Button>
                    </InputGroup>

                    <Form.Control as='textarea' placeholder='Query' value={text}  onChange={(e) => {setText(e.target.value); autoResizeTextArea(e);}}
                    style={{backgroundColor:'white'}}> 
                    </Form.Control>

                    <ToggleButtonGroup type="checkbox" value={useMemory} onChange={()=>setUseMemory(!useMemory)} style={{marginTop:'5px'}}>
                         <span className='h5' style={{marginRight:'5px'}}>Connect to Vector Store</span>
                        <ToggleButton id="toggle-example" value={true} style={{paddingTop:'2px', paddingBottom:'2px', backgroundColor:'blue', borderRadius:'20px'}}>
                            {useMemory ? 'On' : 'Off'}
                        </ToggleButton>
                    </ToggleButtonGroup>

                </Card.Header>
            </Card>
           
               


                <Card>
                    <Card.Header>
                    <Row>

                        <Col>
                            <Form.Label>Model</Form.Label>
                                <Form.Control as='select' style={{backgroundColor:'white'}}>
                                    <option value='gpt-4o'>GPT-4o</option>
                                    <option value='gpt-4o-mini'>GPT-4o-mini</option>
                                </Form.Control>
                        </Col>

                        </Row>

                        <Row>

                        <Col>
                        <Form.Label>Temperature</Form.Label>
                        <Form.Control type='number' min={0} max={1} step={0.1} defaultValue={0.5} style={{backgroundColor:'white'}}/>


                        </Col>
                        <Col>
                        <Form.Label>Max Tokens</Form.Label>
                        <Form.Control type='number' min={0} max={1000} step={10} defaultValue={100} style={{backgroundColor:'white'}}/>

                        </Col>
                        <Col>
                            
                        <Form.Label>Top P</Form.Label>
                        <Form.Control type='number' min={0} max={1} step={0.1} defaultValue={0.5} style={{backgroundColor:'white'}}/>

                        </Col>


                        </Row>

                    </Card.Header>
                </Card>

                <br />

                <Card>
                    <Card.Header>
                        <ListGroup horizontal>
                            <ListGroup.Item>
                                Session
                            </ListGroup.Item>
                            <ListGroup.Item onClick={()=>exportChats()}>
                                Export
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Header>
                </Card>

                <ListGroup>
                {chats.map((chat, index) => (
                    <ListGroup.Item key={index} style={{padding:'1px', border:'None'}}>
                        <LLMChatItem chat={chat} />
                       
                    </ListGroup.Item>
                   
                ))}
                </ListGroup>
                

             
        
        </>

    )
}


export default LLMComponent
