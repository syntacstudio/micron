import React from 'react'
import {NavLink, Link} from 'react-router-dom'
import Tooltip from 'react-tooltip'

function MainPage({children, crumb=[]}) {
    
    return (
       <>
        <div className='row-side'>
            <div className='left-side'>
                <div className='container-fluid'>
                    <ul>
                        <li className="logo">
                            <Link to="/console">
                                <img src="/images/logo.svg" alt=""/>
                            </Link>
                        </li>
                        <li>
                            <NavLink exact to='/console' data-tip  data-for="dashboard" activeClassName="active"  className="ic ic-dashboard">
                            </NavLink>
                            <Tooltip id="dashboard" type="dark" backgroundColor="var(--primary)"  effect="solid" place="right">
                                <span>Dashboard</span>
                            </Tooltip>
                        </li>
                        <li>
                            <NavLink to='/console/deploy'  data-tip data-for="deploy" className="ic ic-app">
                            </NavLink>
                            <Tooltip id="deploy" type="dark" backgroundColor="var(--primary)" effect="solid" place="right">
                                <span>Auto Deploy App</span>
                            </Tooltip>
                        </li>
                        <li>
                            <NavLink to='/console/cron'  data-tip data-for="cron" className="ic ic-cron">
                            </NavLink>
                            <Tooltip id="cron" type="dark" backgroundColor="var(--primary)" effect="solid" place="right">
                                <span>Cron Job</span>
                            </Tooltip>
                        </li>
                        <li>
                            <NavLink to='/console/terminal'  data-tip data-for="terminal" className="ic ic-terminal">
                            </NavLink>
                            <Tooltip id="terminal" type="dark" backgroundColor="var(--primary)" effect="solid" place="right">
                                <span>Web Console</span>
                            </Tooltip>
                        </li>
                        <li>
                            <NavLink to='/console/setting'  data-tip data-for="setting" className="ic ic-setting">
                            </NavLink>
                            <Tooltip id="setting" type="dark" backgroundColor="var(--primary)" effect="solid" place="right">
                                <span>Setting</span>
                            </Tooltip>
                        </li>
                        <li>
                            <NavLink to='/console/update'  data-tip data-for="update" className="ic ic-update">
                            </NavLink>
                            <Tooltip id="update" type="dark" backgroundColor="var(--primary)" effect="solid" place="right">
                                <span>Update</span>
                            </Tooltip>
                        </li>
                        <li className="logout">
                            <a href="#" data-tip data-for="logout" className="ic ic-logout">
                            </a>
                            <Tooltip id="logout" type="dark" backgroundColor="var(--primary)" effect="solid" place="right">
                                <span>Logout</span>
                            </Tooltip>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='main-layout'>
                {children}
            </div>
        </div>
       </>
    )
}

export default MainPage