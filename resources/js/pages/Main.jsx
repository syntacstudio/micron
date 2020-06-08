import React, {useEffect, useState, useReducer} from 'react'
import Layout from './Layouts/Main'
import {Link} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { Line as Area } from 'react-chartjs-2'
import io from 'socket.io-client'

const chatDefaultOption = {
    maintainAspectRatio: false,
    spanGaps: false,
    animation: {
        duration: 100
    },
	elements: {
	    line: {
		    tension: 0.000001
		}
	},
	plugins: {
	    filler: {
		    propagate: false
		}
	},
	scales: {
	    xAxes: [{
		    ticks: {
			    autoSkip: true,
				// maxRotation: 0
            },
            gridLines: {
                // display: false,
            },
        }],
        yAxes: [{
		    ticks: {
			    autoSkip: true,
                maxRotation: 0,
                max: 100,
                min: 0,
                stepSize: 10
            },
            gridLines: {
                // display: false,
            },
		}]
    },
    legend: {
        display: false
    }
}


function MainPage(props) {

    const [cpuData, setCpuData] = useReducer((oldState, newState) => ({ ...oldState, ...newState}), {
        labels: ['12:00'],
        datasets: [{
            label: "Cpu Ussage",
            backgroundColor: 'rgba(255, 146, 52, .4)',
            borderColor: '#ff9234',
            // smooth: true,
            lineTension: 0.2,  
            data: [0],
        }]
    })
    useEffect(() => {
        const socket  = io(window.location.origin) 
        socket.on('connect', () => {
            socket.on('update-cpu', data => {
                setCpuData({
                    labels: data.time,
                    datasets: [
                        {
                            label: "Cpu Ussage",
                            backgroundColor: 'rgba(255, 146, 52, .4)',
                            borderColor: '#ff9234',
                            // smooth: true,
                            lineTension: 0.2,  
                            data: data.data ,
                        }
                    ]
                })
            })
        })
    }, [])

   
    return(
        <Layout>
           <div className="dash-header w-100 d-block">
               <div className="w-100">
                  <div className="container-fluid pt-4">
                    <h1 className="text-white font-weight-light mb-0">Micron Deployer</h1>
                    <p className="text-white">Version 1.0</p>
                  </div>
               </div>
               <div className="header-list mx-0 row">
                   <div className="col-md-8 col-12 pr-3 pr-md-0">
                        <div className="card-header-main card w-100 ">
                            <div className="card-header border-bottom-0 bg-white">
                                <h5 className="mb-0 text-dark">CPU Ussage</h5>
                            </div>
                            <div className="card-body p-2 pt-0">
                                <Area
                                height={250}
                                data={cpuData}
                                options={chatDefaultOption}
                                />
                            </div>
                        </div>
                   </div>
                   <div className="col-md-4">
                       <div className="w-100">
                           <div className="card card-header-main mini">
                                <div className="card-header border-bottom-0 bg-white ">
                                    <h5 className="mb-0 text-dark">RAM Ussage</h5>
                                </div>
                                <div className="card-body">
                                    <div className="usage">
                                        <h2 className="text-primary">
                                            12%
                                        </h2>
                                    </div>
                                    <div className="flying-icon">
                                        <span className="ic ic-ram" style={{ fontSize: '35px' }}></span>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-0">
                                    <div className="progress">
                                        <div className="progress-bar"style={{ width: '40%' }}>12gb / 200gb</div>
                                    </div>
                                </div>
                           </div>
                       </div>
                       <div className="w-100 mt-3">
                           <div className="card card-header-main mini">
                                <div className="card-header border-bottom-0 bg-white">
                                    <h5 className="mb-0 text-dark">Disk Ussage</h5>
                                </div>
                                <div className="card-body">
                                   <div className="usage">
                                        <h2 className="text-primary">
                                            100%
                                        </h2>
                                   </div>
                                    <div className="flying-icon">
                                        <span className="ic ic-disk" style={{ fontSize: '25px' }}></span>
                                    </div>
                                </div>
                                <div className="card-footer bg-white border-0">
                                    <div className="progress">
                                        <div className="progress-bar"style={{ width: '100%' }}>12gb / 200gb</div>
                                    </div>
                                </div>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           <div className="dash-main container-fluid w-100">
           </div>
        </Layout>
    )
}

export default MainPage
