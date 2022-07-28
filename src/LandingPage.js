import React from "react";
import {Link} from 'react-router-dom'


const LandingPage=(props)=>{
    return(
        <div>
            <h1>Welcome, please select your role</h1>
            <Link to='/apply' >Student</Link> <br />
            <Link to='/dashboard' >Admin</Link>
        </div>
    )
}

export default LandingPage