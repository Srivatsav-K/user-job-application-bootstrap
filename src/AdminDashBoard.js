import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'
import swal from "sweetalert";

import DashboardTable from "./DashboardTable";

const AdminDashBoard = (props) => {
    const [applicants, setApplicants] = useState([]) // all applicants data
    const [title, setTitle] = useState('')
    const [filterByTitle, setFilterByTitle] = useState([])

    const jobTitles = ["Front-End Developer", "Node.js Developer", "MEAN Stack Developer", "FULL Stack Developer"]

    useEffect(() => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
            .then((response) => {
                setApplicants(response.data)
            })
            .catch((err) => {
                swal({
                    title: err.message,
                    icon: 'error'
                })
            })
    }, [])

    const handleBtnChange = (e) => {
        setTitle(e.target.value)
    }

    useEffect(() => {
        if (title) {
            const result = applicants.filter(ele => ele.jobTitle === title)
            setFilterByTitle(result)
        }
    }, [title, applicants])

    const updateApplicantsData = (data) => {
        const result = [...applicants].map(ele => {
            if (ele._id === data._id) {
                return { ...ele, ...data }
            } else {
                return { ...ele }
            }
        })
        setApplicants(result)
    }


    return (
        <div>
            <Link to='/' >Home</Link>
            <h1 className="display-4 mb-4" >Admin Dashboard</h1>

            {
                jobTitles.map((ele, i) => {
                    return (
                        <button value={ele} onClick={handleBtnChange} key={i} className='btn btn-outline-primary col-md-2 me-5' >
                            {ele}
                        </button>
                    )
                })
            }

            <DashboardTable title={title} data={filterByTitle} updateApplicantsData={updateApplicantsData} />

        </div>
    )
}

export default AdminDashBoard