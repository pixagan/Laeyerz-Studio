import React , { useState, useEffect,} from 'react'
import { Card, Badge } from 'react-bootstrap'
import MarkdownViewer from './MarkdownViewer'
import { ArrowBigDown } from 'lucide-react'


export const LLMChatItem = ({chat}) => {


    const [viewDetails, setViewDetails] = useState(false)
    
    useEffect(() => {
        
        
    }, [])


    return (

        <>

            <Card style={{borderRadius:'10px', border:"None"}}>
                <Card.Header>
                        <p className='h5'><span>{chat.query}</span><span><Badge style={{color:'blue'}} onClick={()=>setViewDetails(!viewDetails)}><ArrowBigDown /></Badge></span></p> 

                        {viewDetails && (
                            <p>
                                Model : {chat.model} | Tokens Prompt : {chat.tokens_prompt} | Tokens Completion : {chat.tokens_completion}
                            </p>
                        )}
                    </Card.Header>
                <Card.Body>
                    <MarkdownViewer markdown_in={chat.response} />
                </Card.Body>
            </Card>
            
        
        
        </>

    )
}


export default LLMChatItem
