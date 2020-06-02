import React, {useState, useReducer} from 'react'
import axios from 'axios'


const handleLogin = (e, forms, setAlert) => {
    e.preventDefault()

    axios.post('/api/login', forms, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'applicatio/json',
            'CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content')
        },
    })
    .then(({data}) => {
        window.location.href = '/console'
    })
    .catch(({response}) => {
        if(response.status == 403) {
            return setAlert('Ah something wrong, please reload this page')
        }
        return setAlert(response.data.message)
    })
}


function LoginPage() {
    const [alert, setAlert] = useState()
    const [forms, setForms] = useReducer((oldState, newState) => ({...oldState, ...newState}), {
        credential: '',
        password: ''
    })
    return (
        <div className="container-login">
            <div className="card-auth">
                
                {
                    alert &&
                    <div className="alert alert-danger shadow">
                        { alert }
                        <button type="button" className="close" onClick={e => setAlert(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
            
                <div className=" card mx-auto shadow">
                    <div className="card-header">
                        <h5 className="mb-0 font-weight-bold text-white">Login To Console</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={e => handleLogin(e, forms, setAlert)}>
                            <div className="form-group">
                                <label htmlFor="credential" className="col-form-label text-secondary ">Credential</label>
                                    <input type="text" required className="form-control form-control-lg" id="credential" name="credential" autoComplete="off" value={forms.credential} onChange={e => setForms({credential: e.target.value })}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-form-label text-secondary">Password</label>
                                    <input type="password" required className="form-control form-control-lg" id="password" name="password" autoComplete="off" value={forms.password} onChange={e => setForms({password: e.target.value })}/>
                                </div>
                                <div className="w-100 clearfix pt-2">
                                <div className="float-right">
                                    <button className="btn btn-primary px-4">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage