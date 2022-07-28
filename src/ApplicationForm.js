import React, { useState, useEffect } from "react";
import axios from 'axios'
import validator from 'validator'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

const ApplicationForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [experience, setExperience] = useState({ years: 0, months: 0 })
    const [skills, setSkills] = useState('')
    const [error, setError] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const errors = {}

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'name') {
            setName(value)
        } else if (name === 'email') {
            setEmail(value)
        } else if (name === 'phone') {
            setPhone(value)
        } else if (name === 'jobTitle') {
            setJobTitle(value)
        } else if (name === 'experience') {
            setExperience(value)
        } else if (name === 'years') {
            setExperience({ ...experience, years: +value }) //+value = Number(value)
        } else if (name === 'months') {
            setExperience({ ...experience, months: +value })
        } else if (name === 'skills') {
            setSkills(value)
        }
    }

    //above 12 months handler
    useEffect(() => {
        if (experience.months === 12) {
            setExperience({ ...experience, years: experience.years + 1, months: 0 })
        }
    }, [experience])


    const runValidators = () => {
        if (name.length === 0) {
            errors.name = 'Name is required'
        } else if (!validator.isAlpha(name, ["en-US"], { 'ignore': ' ' })) {
            errors.name = 'Invalid Name'
        }

        //email
        if (email.length === 0) {
            errors.email = 'Email is required'
        } else if (!validator.isEmail(email)) {
            errors.email = 'Invalid email format'
        }

        //number
        if (phone.length === 0) {
            errors.phone = 'Phone number is required'
        } else if (phone.slice(0, 4) === ('+91 ')) {
            const phoneCheck = phone.slice(4)
            if (!validator.isMobilePhone(phoneCheck)) {
                errors.phone = 'Invalid Phone number'
            }
        } else if (phone.slice(0, 3) === ('+91')) {
            const phoneCheck = phone.slice(3)
            if (!validator.isMobilePhone(phoneCheck)) {
                errors.phone = 'Invalid Phone number'
            }
        } else {
            if (!validator.isMobilePhone(phone)) {
                errors.phone = 'Invalid Phone number'
            }
        }

        //jobTitle
        if (jobTitle.length === 0) {
            errors.jobTitle = 'Please select the position you are applying for'
        }

        //techskills
        if (skills.length === 0) {
            errors.skills = 'At least 1 skill is required'
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        runValidators()

        if (Object.keys(errors).length === 0) {
            setError({})
            const formData = {
                name,
                email,
                phone,
                skills,
                jobTitle,
                experience: `${experience.years} years, ${experience.months} months `
            }
            axios.post('https://dct-application-form.herokuapp.com/users/application-form', formData)
                .then((response) => {
                    setIsSubmitted(true)
                    swal({
                        title: 'Application submitted successfully',
                        icon: 'success'
                    })
                })
                .catch((err) => {
                    swal({
                        title: 'Application not submitted',
                        text: `${err.message}`,
                        icon: 'error'
                    })
                })
        } else {
            setError(errors)
        }
    }

    useEffect(() => {
        if (isSubmitted) {
            setName('')
            setEmail('')
            setPhone('')
            setJobTitle('')
            setExperience({ years: 0, months: 0 })
            setSkills('')
            setIsSubmitted(false)
        }
    }, [isSubmitted])

    return (
        <div className="row">
            <Link to='/' >Home</Link>
            <h1 className="display-4 mt-4 mb-5">Apply for Job</h1>

            <div className=" w-75 p-3" >
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group mx-auto d-block">

                        <label htmlFor="name" className="form-label">Fullname</label>
                        <input type="text"
                            value={name}
                            onChange={handleChange}
                            name='name'
                            id="name"
                            className="form-control"
                        />
                        {error.name && <small className="text-danger">{error.name}</small>}
                        <br /><br />

                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="text"
                            value={email}
                            onChange={handleChange}
                            name='email'
                            id="email"
                            placeholder="example@email.com"
                            className="form-control"
                        />
                        {error.email && <small className="text-danger">{error.email}</small>}
                        <br /><br />

                        <label htmlFor="phone" className="form-label">Contact number</label>
                        <input type="text"
                            value={phone}
                            onChange={handleChange}
                            name='phone'
                            id="phone"
                            placeholder="+91 9988554344"
                            className="form-control"
                        />
                        {error.phone && <small className="text-danger">{error.phone}</small>}
                        <br /><br />

                        <label htmlFor="jobTitle" className="form-label">Applying for job</label>
                        <select name="jobTitle" id="jobTitle" value={jobTitle} onChange={handleChange} className="form-select" >
                            <option value="">----Select----</option>
                            <option value="Front-End Developer">Front-End Developer</option>
                            <option value="Node.js Developer">Node.js Developer</option>
                            <option value="MEAN Stack Developer">MEAN Stack Developer</option>
                            <option value="FULL Stack Developer">FULL Stack Developer</option>
                        </select>
                        {error.jobTitle && <small className="text-danger">{error.jobTitle}</small>}
                        <br /><br />

                        <div className="row">
                            <label htmlFor="experience" className="form-label">Experience</label>

                            <div className="col">
                                <input type="number"
                                    name="years"
                                    value={experience.years}
                                    onChange={handleChange}
                                    min='0' max='30'
                                    className="form-control"
                                /> years
                            </div>

                            <div className="col">
                                <input type="number"
                                    name="months"
                                    value={experience.months}
                                    onChange={handleChange}
                                    min='0' max='12'
                                    className="form-control"
                                /> months <br /><br />
                            </div>
                        </div>


                        <label htmlFor="skills" className="form-label">Technical Skills</label>
                        <textarea name="skills"
                            id="skills"
                            value={skills}
                            onChange={handleChange}
                            placeholder='Technical Skills'
                            className="form-control">
                        </textarea>
                        {error.skills && <small className="text-danger">{error.skills}</small>}
                        <br /><br />

                        <input type="submit" value='Send Application' className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApplicationForm

