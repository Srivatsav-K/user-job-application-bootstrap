import React from "react";
import {Link,Route} from 'react-router-dom'

import LandingPage from "./LandingPage";
import ApplicationForm from "./ApplicationForm";
import AdminDashBoard from "./AdminDashBoard";

const App=(props)=>{
    return(
        <div>
            <Link to='/' ></Link>
            
            <Route path='/' component={LandingPage} exact={true} />
            <Route path='/apply' component={ApplicationForm} />
            <Route path='/dashboard' component={AdminDashBoard}/>
        </div>
    )
}

export default App