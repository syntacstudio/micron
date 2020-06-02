import React from 'react'
import ReadDom from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"

import LoginPage from './pages/Login'
import MainPage from './pages/Main'
import RepoPage from './pages/Repo'

function App() {
   return(
    <Router>
        <Switch>
        <Route path="/console/login" component={LoginPage}/>
        <Route path="/console/:repo" component={RepoPage}/>
        <Route path="/console" component={MainPage}/> 
    </Switch>
    </Router>
   )
}

ReadDom.render(<App/>, document.getElementById('root'))