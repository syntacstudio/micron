import React, {useEffect, useState, useReducer} from 'react'
import Layout from './Layouts/Main'
import {Link} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import { Line as Area } from 'react-chartjs-2';

const chatDefaultOption = {
    maintainAspectRatio: false,
	spanGaps: false,
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
				maxRotation: 0
            },
            gridLines: {
                // display: false,
            },
        }],
        yAxes: [{
		    ticks: {
			    autoSkip: true,
				maxRotation: 0
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
        labels: ['12:00', '12:01', '12:02', '12:03', '12:05', '12:06', '12:07', '12:08', '12:09', '12:10', '12:11', '12:23'],
        datasets: [{
            label: "Cpu Ussage",
            backgroundColor: 'rgba(255, 146, 52, .4)',
            borderColor: '#ff9234',
            smooth: true,
            lineTension: 0.2,  
            data: [100, 60, 75, 20, 20, 55, 40, 45, 56, 100, 10, 0],
        }]
    })
    useEffect(() => {
        const randCreate = () => Math.floor(Math.random() * 101)
        setInterval(() => {
            setCpuData({
                labels: ['12:00', '12:01', '12:02', '12:03', '12:05', '12:06', '12:07', '12:08', '12:09', '12:10', '12:11', '12:23'],
                datasets: [{
                    label: "Cpu Ussage",
                    backgroundColor: 'rgba(255, 146, 52, .4)',
                    borderColor: '#ff9234',
                    smooth: true,
                    lineTension: 0.2,  
                    data: [randCreate(), randCreate(), randCreate(), randCreate(),randCreate(),randCreate(),randCreate(),randCreate(),randCreate(),randCreate(),randCreate(),randCreate(),randCreate()]
                }]
            })
        }, 2000)
    }, [])

   
    return(
        <Layout>
           <div className="dash-header">
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
                                        <span className="ic-ram" style={{ fontSize: '35px' }}></span>
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
                                        <span className="ic-disk" style={{ fontSize: '25px' }}></span>
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
           <div className="dash-main container-fluid">
           </div>
        </Layout>
    )
}

export default MainPage
