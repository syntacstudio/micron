import React, {useEffect, useState, useReducer, useRef} from 'react'
import Layout from './Layouts/Main'
import gritty from '../plugins/gritty-client'

function ConsolePage(props) {
    const consoleRef = useRef()
    useEffect(() => {
        const options = {
            command: 'bash', 
            autoRestart: true,
            cwd: '/var/www',
            env: {
                TERMINAL: 'gritty',
            },
        };
        gritty(consoleRef, options); 
    }, [])

    return(
        <Layout>
            <div className="dash-header-mini">
                <div className="container-fluid pt-4">
                    <h1 className="text-white font-weight-light mb-0">Web Console</h1>
                </div>
            </div>
            <div id="main-console" ref={consoleRef}></div>
        </Layout>
    )
}

export default ConsolePage
