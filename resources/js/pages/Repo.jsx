import React, {useEffect, useState} from 'react'
import Layout from './Layouts/Main'
import {Link} from 'react-router-dom'
import moment from 'moment'
import Tooltip from 'react-tooltip'
import axios from 'axios'


const data = [
    {
        'id' : '1846c199',
        'repo' : 'tofikhidayat/deployer',
        'branch' : [
            'master',
            'publich',
            'develop'
        ],
        'syncronus' : true,
        'timeout': 1200,
        'createdAt': '2020/09/23',
        'process': [
            {
                cmd: 'ls -a',
                cwd: '/var/www/tiny-deployer'
            }, {
                cmd: 'echo {repo} {branch}',
                cwd: '/var/www/tiny-deployer'
            }, {
                cmd: 'npm install',
                cwd: '/var/www/tiny-deployer'
            }
        ]
        
    }, 
    {
        'id' : '1846c1912',
        'repo' : 'tofikhidayat/byebyefever',
        'branch' : [
            '*'
        ],
        'syncronus' : false,
        'timeout': false,
        'createdAt': '2020/09/23',
        'process': [
            {
                cmd: 'ls -a',
                cwd: '/var/www/tiny-deployer'
            }, {
                cmd: 'echo {repo} {branch}',
                cwd: '/var/www/tiny-deployer'
            }, {
                cmd: 'npm install',
                cwd: '/var/www/tiny-deployer'
            }
        ]
        
    }
] 


function RePoPage(props) {
    const [dir, setDir] = useState([])
    const repo = props.match.params.repo
    // useEffect(() => {
    //     axios.get(`/api/histories/${repo}`, {
    //         'Content-Type': 'application/json',
    //         'Accept': 'applicatio/json'
    //     })
    //     .then(({data}) => {
    //         setDir(data.data)
    //     })
    //     .catch(({response}) => {
    //         if(response.status == 401) {
    //             return window.location.href = '/login'
    //         }
    //     })
    // }, [])

    return(
        <Layout>
           <div className="dash-header-mini w-100">
               <div className="container-fluid pt-4">
                    <h1 className="text-white font-weight-light mb-0">Auto Deploy App</h1>
               </div>
           </div>
           <div className="dash-layout-tree pt-3">
               <div className="row mx-0 px-1">
                   { data.map((itm, key) => {
                       return(
                        <div className="col-lg-3 col-md-4 col-6" key={key}>
                            <Link to="/console/deploy/repo1">
                                <div className="card border-0 card-repo shadow">
                                        <img src="/images/pattern.png" alt="" className="back-image"/>
                                        <div className="main-card py-3 px-4">
                                            <h3 className="mb-1">Micron test [Develop]</h3>
                                            <h4 className="mb-0">tofik hidayat / micron</h4>
                                            <div className="w-100 list-process clearfix">
                                                <div className="list-icon">
                                                    <i className="ic ic-process"></i>
                                                </div>
                                                <div className="list-data">
                                                    <span>12</span>
                                                </div>
                                            </div>
                                            <div className="w-100 list-process text-danger mt-2 clearfix">
                                                <div className="list-icon">
                                                    <i className="ic ic-deploy"></i>
                                                </div>
                                                <div className="list-data">
                                                    <span>Failed Deploy</span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </Link>
                        </div>
                       )
                   })}
                   <div className="col-lg-3 col-md-4 col-6">
                        <div className="add-new-repo">
                                <span className="ic ic-plus"></span>
                        </div>
                   </div>
               </div>
           </div>
        </Layout>
    )
}

export default RePoPage
