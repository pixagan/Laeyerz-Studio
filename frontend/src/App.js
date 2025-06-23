import './App.css';

import React from 'react'


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PlaygroundScreen from './screens/PlaygroundScreen'

//Components
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'


const App = () => {

  return (

    <Router>

      <Header />


      <main className='py-3' style={{marginTop:'0px', paddingTop:'0px'}}>

        <Routes>
     
          <Route path='/' element={<PlaygroundScreen />} exact />
        </Routes>

      </main>

      <Footer />

    </Router>

  );
}

export default App;



