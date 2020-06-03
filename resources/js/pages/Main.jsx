import React, {useEffect, useState} from 'react'
import Layout from './Layouts/Main'
import {Link} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

function Main(props) {
   
    return(
        <Layout>
           <div className="dash-header">
               <div className="w-100">
                  <div className="container-fluid pt-4">
                    <h1 className="text-white ">Micron Deployer</h1>
                  </div>
               </div>
               <div className="header-list">
                    <div className="card-header-main card">
                        <div className="container-fluid">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit odit ipsum, earum incidunt ea quos, eos nam commodi, vero possimus est esse aut temporibus? Accusantium quos eius sint praesentium voluptatibus?
                        </div>
                    </div>
                    <div className="card-header-main card">
                        <div className="container-fluid">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit odit ipsum, earum incidunt ea quos, eos nam commodi, vero possimus est esse aut temporibus? Accusantium quos eius sint praesentium voluptatibus?
                        </div>
                    </div>
               </div>
           </div>
        </Layout>
    )
}

export default Main
