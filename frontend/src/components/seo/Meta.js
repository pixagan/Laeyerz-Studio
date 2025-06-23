import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title> {title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Laeyerz-Playground',
    description: 'A Playground for LLM Apps and Agents',
    keywords: 'LLM, Agents, AI, Playground'
}

export default Meta
