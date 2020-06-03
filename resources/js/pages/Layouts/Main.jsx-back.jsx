import React from 'react'
import {NavLink, Link} from 'react-router-dom'


function MainPage({children, crumb=[]}) {
    console.log(crumb)
    return (
       <>
       <div className="bg-white shadow py-3">
            <div className="container">
                <h3>Nitro-N</h3>
            </div>
       </div>
        <div className="container py-5">
           <div className="row">
               <div className="col-md-3">
                    <ul className="list-group list-nav">
                        <li className="list-group-item py-0 px-0">
                            <NavLink to="/console" className="btn btn-block" >Dashboard</NavLink>
                        </li>
                        <li className="list-group-item py-0 px-0">
                            <NavLink to="/console/cmd"  className="btn btn-block">Web Console</NavLink>
                        </li>
                        <li className="list-group-item py-0 px-0">
                            <NavLink to="/console/setting" className="btn btn-block"    >Setting</NavLink>
                        </li>
                    </ul>
                    <button className="btn btn-danger mt-3 btn-block">Signout</button>
               </div>
               <div className="col-md-9">
                   <div className="w-100">
                       <ul className="li py-2 pt-md-0 list-unstyled clearfix mb-0">
                           {crumb.map((itm, key) => {
                              return(
                                <li key={key}>
                                    <Link to={itm.path}>{ itm.name }</Link>
                                </li>
                              )
                           })}
                       </ul>
                   </div>
                  <div className="w-100">
                  {children}
                  </div>
               </div>
           </div>
        </div>
       </>
    )
}

export default MainPage