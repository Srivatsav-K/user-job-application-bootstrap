import React, { useState } from "react";
import axios from "axios";

import Modal from "./Modal";

const DashboardTable = (props) => {
    const { title, data, updateApplicantsData } = props

    const [details, setDetails] = useState({})

    const viewDetails = (id) => {
        const result = [...data].find(ele => ele._id === id)
        setDetails(result)
    }

    const handleShortlisting = (id) => {
        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${id}`, { status: 'shortlisted' })
            .then((response) => {
                updateApplicantsData(response.data)
            })
            .catch(err => alert(err.message))
    }

    const handleRejection = (id) => {
        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${id}`, { status: 'rejected' })
            .then((response) => {
                updateApplicantsData(response.data)
            })
            .catch(err => alert(err.message))
    }


    return (
        data.length > 0 && (
            <div>

                <Modal details={details} />

                <h1 className="display-5 mt-4">{title}s</h1>
                <p className="lead mb-4">List of applicants applied for {title} job</p>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Expirence</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ele => {
                            return (
                                <tr key={ele._id}>
                                    <td>{ele.name}</td>
                                    <td style={{ wordWrap: 'break-word', minWidth: '160px', maxWidth: '300px' }}>{ele.skills}</td>
                                    <td>{ele.experience}</td>
                                    <td>{ele.createdAt.slice(0, 10)}</td>

                                    <td>
                                        <button className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#showDetails" onClick={() => viewDetails(ele._id)} >
                                            View Details
                                        </button>
                                    </td>

                                    <td>
                                        {ele.status === 'shortlisted' && (
                                            <button className="btn btn-primary btn-sm btn-success">
                                                {ele.status}
                                            </button>
                                        )}

                                        {ele.status === 'rejected' && (
                                            <button className="btn btn-primary btn-sm btn-danger">
                                                {ele.status}
                                            </button>
                                        )}

                                        {ele.status === 'applied' && (
                                            <div>
                                                <button className="btn btn-primary btn-sm btn-success" onClick={() => { handleShortlisting(ele._id) }} >
                                                    shortlist
                                                </button>

                                                <button className="btn btn-primary btn-sm btn-danger" onClick={() => { handleRejection(ele._id) }} >
                                                    reject
                                                </button>
                                            </div>

                                        )}

                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    )
}

export default DashboardTable