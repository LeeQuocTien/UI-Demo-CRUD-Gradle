import { useState, useEffect } from "react";

import api from "../../Api";

export default function InputStudent({ studentData, updatedStudent, setStudentData, setUpdatedStudent }) {

    const studentEntity = {
        name: "",
        email: "",
        age: "",
    }

    const [inputStudent, setInputStudent] = useState(studentEntity);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        updatedStudent && setInputStudent(updatedStudent)
    }, [updatedStudent])

    const updatedStudentIndx = updatedStudent && studentData.findIndex((student) => student.id === updatedStudent.id)

    const fetchSuccess = (response) => {
        const updatedData = [...studentData.slice(0, updatedStudentIndx), response.data, ...studentData.slice(updatedStudentIndx + 1)]

        updatedStudentIndx === null ? setStudentData([...studentData, response.data]) : setStudentData([...updatedData])
        setInputStudent(studentEntity)
        setUpdatedStudent(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputStudent.name && inputStudent.email && inputStudent.age) {

            if(updatedStudentIndx === null) {
                await api.create(inputStudent)
                .then( response => fetchSuccess(response))
                .catch(error => setErrorMessage(`Failed to create with record: ${error.message}`))
            } else {
                await api.update(inputStudent)
                .then(response => fetchSuccess(response))
                .catch(error => setErrorMessage(`Failed to update with record: ${error.message}`))
            }
        } else {
            setErrorMessage("Please provide valid data");
        }
    }

    const changeHand = (e) => {
        setErrorMessage(null)
        setInputStudent({
            ...inputStudent,
            [e.target.name]: e.target.value
        })
    };

    const cancelClick = (e) => {
        e.preventDefault();
        setInputStudent(studentEntity);
        setUpdatedStudent(null)
    }

    return (
        <>
            {errorMessage ?
                <div data-testid="input-message" style={{backgroundColor: "red", width:"50%"}}>
                    {errorMessage}
                </div> : null
            }

            <div className="input-field">
                <form className="input-field__form" action="" onSubmit={handleSubmit}>
                    <input placeholder="Student Name" className="input-field__form-input" type="text" name="name" value={inputStudent.name} onChange={(e) => changeHand(e)} />
                    <input placeholder="Student Email" className="input-field__form-input" type="text" name="email" value={inputStudent.email} onChange={(e) => changeHand(e)} />
                    <input placeholder="Student Age" className="input-field__form-input" type="text" name="age" value={inputStudent.age} onChange={(e) => changeHand(e)} />
                    <div>
                        <button className="input-field__form-button">{ updatedStudentIndx === null ? "Add Student" : "Update Student" }</button>
                        <button className="input-field__form-button" onClick={ cancelClick }>Cancel</button>
                    </div>
                </form>
            </div>
        </>
  )
}