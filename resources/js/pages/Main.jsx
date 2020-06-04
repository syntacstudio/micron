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
                    <h1 className="text-white font-weight-light mb-0">Micron Deployer</h1>
                    <p className="text-white">Version 1.0</p>
                  </div>
               </div>
               <div className="header-list">
                    <div className="card-header-main card">
                        <div className="p-3">
                            <ul class="list-type list-unstyled">
                                <li class="list-group-item py-2">
                                    <div className="list-type">
                                        <span>Operating system</span>
                                    </div>
                                    <div className="list-desc">
                                        <span>Ubuntu 18 64 bit</span>
                                    </div>
                                </li>
                                <li class="list-group-item py-2">
                                    <div className="list-type">
                                        <span>Manufactur</span>
                                    </div>
                                    <div className="list-desc">
                                        <span>MSI  ##model</span>
                                    </div>
                                </li>
                                <li class="list-group-item py-2">
                                    <div className="list-type">
                                        <span>CPU</span>
                                    </div>
                                    <div className="list-desc">
                                        <span>Intel(R) core i5</span>
                                    </div>
                                </li>
                                <li class="list-group-item py-2">
                                    <div className="list-type">
                                        <span>Uptime</span>
                                    </div>
                                    <div className="list-desc">
                                        <span>121212</span>
                                    </div>
                                </li>
                                <li class="list-group-item py-2">
                                    <div className="list-type">
                                        <span>Ram</span>
                                    </div>
                                    <div className="list-desc">
                                        <span>gskilll 12gb</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="card-header-main card">
                        <div className="p-3">
                            <div className="w-100">
                                <span className="text-dark">Cpu Load</span>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '10%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        12%
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 mt-2">
                                <span className="text-dark">Free Temperature</span>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '30%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        120C / 100
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 mt-2">
                                <span className="text-dark">Ram Load</span>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '70%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                    12bg / 12gb
                                    </div>
                                </div>
                            </div>
                            <div className="w-100 mt-2">
                                <span className="text-dark">Free Storage</span>
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{ width: '20%' }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                        12bg / 12gb
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
           <div className="dash-main container-fluid">
               {/* <div className="row">
                   <div className="col-md-4 mt-4">
                       <div className="card shadow">
                           <div className="card-header bg-primary">
                               <h5 className="mb-0 text-white">CPU Info</h5>
                           </div>
                           <div className="card-body">
                               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi ducimus, corrupti id mollitia quas ipsa voluptatibus ipsam, repudiandae saepe minima maxime. Sint, dolore placeat. Consequuntur vel praesentium possimus rem ipsam.
                           </div>
                       </div>
                   </div>
                   <div className="col-md-4 mt-4">
                       <div className="card shadow">
                           <div className="card-header bg-primary">
                               <h5 className="mb-0 text-white">Bios Info</h5>
                           </div>
                           <div className="card-body">
                               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi ducimus, corrupti id mollitia quas ipsa voluptatibus ipsam, repudiandae saepe minima maxime. Sint, dolore placeat. Consequuntur vel praesentium possimus rem ipsam.
                           </div>
                       </div>
                   </div>
                   <div className="col-md-4 mt-4">
                       <div className="card shadow">
                           <div className="card-header bg-primary">
                               <h5 className="mb-0 text-white">RAM Info</h5>
                           </div>
                           <div className="card-body">
                               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi ducimus, corrupti id mollitia quas ipsa voluptatibus ipsam, repudiandae saepe minima maxime. Sint, dolore placeat. Consequuntur vel praesentium possimus rem ipsam.
                           </div>
                       </div>
                   </div>
                   <div className="col-md-4 mt-4">
                       <div className="card shadow">
                           <div className="card-header bg-primary">
                               <h5 className="mb-0 text-white">Storage Info</h5>
                           </div>
                           <div className="card-body">
                               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi ducimus, corrupti id mollitia quas ipsa voluptatibus ipsam, repudiandae saepe minima maxime. Sint, dolore placeat. Consequuntur vel praesentium possimus rem ipsam.
                           </div>
                       </div>
                   </div>
                   <div className="col-md-4 mt-4">
                       <div className="card shadow">
                           <div className="card-header bg-primary">
                               <h5 className="mb-0 text-white">Auto deploy App</h5>
                           </div>
                           <div className="card-body">
                               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi ducimus, corrupti id mollitia quas ipsa voluptatibus ipsam, repudiandae saepe minima maxime. Sint, dolore placeat. Consequuntur vel praesentium possimus rem ipsam.
                           </div>
                       </div>
                   </div>
                   <div className="col-md-4 mt-4">
                       <div className="card shadow">
                           <div className="card-header bg-primary">
                               <h5 className="mb-0 text-white">Cron Process</h5>
                           </div>
                           <div className="card-body">
                               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi ducimus, corrupti id mollitia quas ipsa voluptatibus ipsam, repudiandae saepe minima maxime. Sint, dolore placeat. Consequuntur vel praesentium possimus rem ipsam.
                           </div>
                       </div>
                   </div>
               </div> */}
           </div>
        </Layout>
    )
}

export default Main
