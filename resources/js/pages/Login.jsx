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
        <div className="login-container">
            <div className="login-space">
                <img src="/images/login_illustration.svg" alt="" className="login-illustration"/>
            </div>
            <div className="login-main justify-content-ceter flex-column p-5">
                <div className="mr-auto">
                    <a target="_blank" href="https://github.com/syntacstudio/micron">
                        <img src="/images/logo.svg" height="70px" width="70px" className="logo-micron" alt=""/>
                    </a>
                </div>  
                <div className="login-header mt-3 mr-auto">
                    <h1 className="text-left text-dark font-weight-bold">
                        Hello Again Bro :)
                    </h1>
                    <p className="text-left font-weight-normal text-secondary mt-2">
                        Thank you for using micron,<br/>
                        To keep your micron console safe, you must log in again,
                    </p>
                </div>
                {
                    alert &&
                    <div className="alert alert-danger shadow w-100 d-flex">
                        { alert }
                        <button type="button" className="btn brn-transparent p-0 close ml-auto" onClick={e => setAlert(false)}>
                            <span aria-hidden="true" style={{ fontSize: '15px' }}>&times;</span>
                        </button>
                    </div>
                }
                <form className="login-form w-100 d-block" onSubmit={e => handleLogin(e, forms, setAlert)}>
                    <div className="form-group">
                        <label htmlFor="credential" className="col-form-label pb-0">Credential</label>
                        <input type="text"  id="credential" className="form-control form-control-lg shadow-none pt-0 px-0 pb-0" autoComplete="off" value={forms.credential} onChange={e => setForms({credential: e.target.value })}/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="password" className="col-form-label mb-0 pb-0">Password</label>
                        <input type="password"  id="password" className="form-control form-control-lg shadow-none pt-0 px-0 pb-0" autoComplete="off" value={forms.password} onChange={e => setForms({password: e.target.value })}/>
                    </div>
                    <div className="w-100 pt-4">
                        <button className="btn btn-primary shadow-none btn-block btn-lg text-white">
                            LOGIN
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage