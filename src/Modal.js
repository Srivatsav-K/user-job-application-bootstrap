import React from "react";

const Modal=(props)=>{
    const {details}=props

    return(
        <div>
            <div className="modal" id="showDetails" tabIndex="-1" aria-labelledby="modal-title" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modal-title">
                                {details.name} profile
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td> <b>Contact number</b> </td>
                                        <td>{details.phone}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Email</b></td>
                                        <td>{details.email}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Skills</b></td>
                                        <td style={{wordWrap:'break-word',maxWidth:'100px'}}>{details.skills}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Experience</b></td>
                                        <td>{details.experience}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal