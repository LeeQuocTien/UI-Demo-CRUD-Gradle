import { useState, useEffect } from "react";

import api from "../api";

export default function InputStudent({ updatedStudent, studentData, setStudentData, setUpdatedStudent }) {

    const studentEntity = {
        name: "",
        email: "",
        age: "",
    }

    useEffect(() => {
        updatedStudent && setInputStudent(updatedStudent)
    },[updatedStudent])

    const [inputStudent, setInputStudent] = useState(studentEntity);
    const [errorMessage, setErrorMessage] = useState(null)

    const updatedStudentIndx = updatedStudent && studentData.findIndex((student) => student.id === updatedStudent.id)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputStudent.name && inputStudent.email && inputStudent.age) {
            let result = updatedStudentIndx === null ? await api.create(inputStudent) : await api.update(inputStudent);

            if (!result.data) {
                setErrorMessage( `Failed to ${!updatedStudentIndx ? "create" : "update"} record: ${result.message}`)
            } else {
                const updatedData = [...studentData.slice(0, updatedStudentIndx), result.data, ...studentData.slice(updatedStudentIndx + 1)]

                updatedStudentIndx === null ? setStudentData([...studentData, result.data]) : setStudentData([...updatedData])
                setInputStudent(studentEntity)
                setUpdatedStudent(null)
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
                <div style={{backgroundColor: "red", width:"50%"}}>
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