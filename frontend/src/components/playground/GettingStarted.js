import React , { useEffect,} from 'react'
import { Card} from 'react-bootstrap'


export const GettingStarted = ({ }) => {

  

    useEffect(() => {
        
        
    }, [])



    return (

        <>

            <div style={{minHeight:'99vh', padding:'10px'}}>

                <p className='h2'>Getting started with Laeyerz-Playground</p>

                <ul>
                    <li>
                        Laeyerz- Playground allows you to experiment with the pieces of the Retrieval-Augmented Generation (RAG) pipeline.
                    </li>
                    <li>
                        You can load data from pdfs. Experiment with data cleaning and chunking.
                    </li>
                    <li>
                        Explore different vector stores and databases.
                    </li>
                    <li>
                        Experiment with different LLMs and models.
                    </li>
                    <li>
                        Understand the basics of prompting and how to best structure and chain prompts
                    </li>
                    
                </ul>
                

                <Card style={{padding:'10px', border:"None"}}>

                    <p className='h1'>RAG Basics</p>

                   

                    <p>RAG stands for Retrieval-Augmented Generation. It’s a powerful way to improve how AI answers questions and generates content.</p>
                    <p>How it works:</p>

                    <ul>
                        <li>
                            Combines a language model (LLM) with external data sources.
                        </li>
                        <li>
                            Instead of relying only on what the LLM was trained on, RAG retrieves relevant data at runtime.
                        </li>
                        <li>
                            <p>The LLM then uses this data to generate more accurate and up-to-date answers.</p>
                        </li>
                    </ul>



                    <p className='h5'>
                        First a knowledge store is created. This is done by.
                       
                    </p>
                    <ul>
                            <li>Breaking the documents into chunks</li>
                            <li>Converting the chunks into vectors using a Vector Embedding Model</li>
                            <li>Storing the vectors in a Vector Database</li>
                        </ul>

                

                    <img src={'/images/RAG_Storage_Pipeline.png'} alt="DataPad" style={{width:'60%'}}/>

                </Card>

                <hr />

                
                
                <Card style={{padding:'10px', border:"None"}}>

                    <p className='h5'>
                        Retrieval and Generation Pipeline
                    </p> 

                    <ul>
                        <li>The user query is first converted into a vector using a Vector Embedding Model.
                        <li>The vector is then compared to the vectors in the knowledge store.</li>
                        <li>The most similar vectors are retrieved.</li>
                        <li>The query along with relevant instructions and the retrieved vectors are passed to an LLM.</li>
                        <li>The LLM then uses the retrieved data to generate an answer.</li>
                        </li>
                    </ul>

                    <img src={'/images/RAG_Retrieval_Pipeline.png'} alt="DataPad" style={{width:'60%'}}/>
                </Card>
               
                <hr />


                <Card style={{padding:'10px', border:"None"}}>
                <p className='h5'> Data is loaded into a DataPad. Clean and process your data to make it ready for vectorization.</p>

                <img src={'/images/Datapad_View.png'} alt="DataPad" style={{width:'50%'}}/>
                </Card>

                <hr />

                <Card style={{padding:'10px', border:"None"}}>
                    <p className='h5'>Indexing and Vector Stores</p>
                    <img src={'/images/Indexing_text.png'} alt="DataPad" style={{width:'60%'}}/>
                </Card>

                <hr />

                <Card style={{padding:'10px', border:"None"}}>
                <p className='h5'>
                    Vector Stores
                </p>
                <img src={'/images/VectorStore.png'} alt="DataPad" style={{width:'60%'}}/>
                </Card>

                <hr />
                
                <Card style={{padding:'10px', border:"None"}}>
                <p className='h5'>
                    LLM
                </p>
                <img src={'/images/LLM_diagram.png'} alt="DataPad" style={{width:'60%'}}/>

                <p></p>
                </Card>

                








            </div>
            
        </>

    )
}


export default GettingStarted
