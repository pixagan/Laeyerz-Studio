import React , { useState, useEffect,} from 'react'


export const StoreProperties = ({ }) => {

    const [storeType, setStoreType] = useState("FAISS")
    const [embeddingModel, setEmbeddingModel] = useState("Huggingface")
    const [vectorDimension, setVectorDimension] = useState(384)
    const [noOfVectors, setNoOfVectors] = useState(0)
    

    const updateTextItem = () => {

    }

    
    useEffect(() => {
        
        
    }, [])






    return (

        <>

            <p className='h3'>Store Properties</p>

            <p className='h5'>Store Type : {storeType}</p>

           <p className='h5'>Embedding Model : {embeddingModel}</p>

           <p className='h5'>Vector Dimension : {vectorDimension}</p>

           <p className='h5'>No of stored Vectors : {noOfVectors}</p>



        
        </>

    )
}


export default StoreProperties
