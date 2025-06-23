import React, { useEffect } from 'react' 
import {  useNavigate} from 'react-router-dom'
import {Navbar, Nav } from 'react-bootstrap'

const Header = () => {

   
    const navigate = useNavigate();


    useEffect(() => {


    }, [])

    const navigateToHome = () => {
        navigate('/')
    }


    return (
        <header className="header" style={{border:'None', marginBottom:'0px', paddingBottom:'1px',borderLeft:'None', borderRight:'None'}}>

            <Navbar expand="lg" collapseOnSelect style={{padding:'0px', borderColor:'#b861fb', marginTop:'0px', marginBottom:'0px'}}>
                
                   
                    <Nav.Link onClick={()=>navigateToHome()}>
                        <p className='h4'>Laeyerz Playground</p>
                    </Nav.Link>



        </Navbar>

        </header>
    )
}

export default Header