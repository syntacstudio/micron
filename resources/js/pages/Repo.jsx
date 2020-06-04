import React, {useEffect, useState} from 'react'
import Layout from './Layouts/Main'
import {Link} from 'react-router-dom'
import moment from 'moment'
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
           <div className="dash-header-mini">
               <div className="container-fluid pt-4">
                    <h1 className="text-white font-weight-light mb-0">Auto Deploy App</h1>
               </div>
           </div>
           <div className="dash-layout-tree pt-3">
               <div className="w-100 clearfix">
                   <div className="container-fluid">
                        <button className="float-right text-white rounded btn btn-primary">
                            New Process <i className="ic-plus"></i>
                        </button>
                   </div>
               </div>
               <div className="container-fluid mt-3">
                    <div className="dir-tree rounded clearfix">
                        <div className="dir-id float-left">
                            <span>Id</span>
                        </div>
                        <div className="dir-name float-left">
                            <span>Repository</span>
                        </div>
                        <div className="dir-branch float-left">
                            <span>Branch</span>
                        </div>
                        <div className="process-type float-left">
                            <span>Process Type</span>
                        </div>
                        <div className="process-list float-left">
                            <span>Process Timeout</span>
                        </div>
                        <div className="process-list float-left">
                            <span>Process List</span>
                        </div>
                        <div className="dir-created float-left">
                            <span>Created At</span>
                        </div>
                        <div className="dir-action float-left">
                            <span>Action</span>
                        </div>
                    </div>
               </div>
               <div className="container-fluid mt-3">
                    {
                        data.map((itm, key) => {
                            return(
                                <div className="dir-tree-detail rounded clearfix" key={key}>
                                    <div className="dir-id float-left">
                                        <span>{ itm.id }</span>
                                    </div>
                                    <div className="dir-name float-left">
                                        <span>{ itm.repo }</span>
                                    </div>
                                    <div className="dir-branch float-left">
                                        <ul>
                                            {itm.branch.map((br, brkey) => {
                                                return(
                                                    <li key={brkey}>
                                                        {br}
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="process-type float-left">
                                        <span>{ itm.syncronus ? 'Syncronus': 'asyncronus' }</span>
                                    </div>
                                    <div className="process-list float-left">
                                        <span>{ itm.timeout }</span>
                                    </div>
                                    <div className="process-list float-left">
                                        <ul>
                                            {itm.process.map((pr, prkey) => {
                                                return(
                                                    <li key={prkey}>
                                                        <div className="cmd">
                                                            <span>cmd</span>
                                                            <span>{ pr.cmd }</span>
                                                        </div>
                                                        <div className="cwd">
                                                            <span>cwd</span>
                                                            <span>{ pr.cwd }</span>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="dir-created float-left">
                                        <span>{ itm.createdAt }</span>
                                    </div>
                                    <div className="dir-action float-left">
                                        <span>Action</span>
                                    </div>
                                </div>
                            )
                        })
                    }
               </div>
           </div>
        </Layout>
    )
}

export default RePoPage
