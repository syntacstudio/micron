import React, {useEffect, useState} from 'react'
import Layout from './Layouts/Main'
import {Link} from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

function Main(props) {
    const [dir, setDir] = useState([])
    useEffect(() => {
        axios.get('/api/histories/', {
            'Content-Type': 'application/json',
            'Accept': 'applicatio/json'
        })
        .then(({data}) => {
            setDir(data.data)
        })
        .catch(({response}) => {
            if(response.status == 401) {
                return window.location.href = '/login'
            }
        })
    }, [])

    console.log(props)
    return(
        <Layout>
            <div className="row border-bottom pb-2 mx-0">
                <div className="col-8">
                    <span>Name</span>
                </div>
                <div className="col-4">
                    <span>Created At</span>
                </div>
            </div>
            <div className="w-100">
                {
                    dir ?
                    dir.map((itm, key) => {
                        return(
                            <Link className="text-dark d-block bg-white shadow py-2 mt-2 rounded" key={key} to={`/console/${itm.name}`}>
                                <div className="row mx-0">
                                    <div className="col-8">
                                        <strong>{ itm.name }</strong>
                                    </div>
                                    <div className="col-4">
                                        <span> { moment(itm.createdAt).format("YYYY-MMMM-DD HH:MM:SS ") }</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })  :
                    <div className="alert alert-warning">No log found</div>
                }
            </div>
        </Layout>
    )
}

export default Main
