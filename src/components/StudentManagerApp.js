import NavBar from "./NavBar";
import StudentList from "./StudentList";
import InputStudent from "./InputField";
import { useState, useEffect } from "react";

import api from "../Api";

export default function StudentManagerApp() {

    const [studentData, setStudentData] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [updatedStudent, setUpdatedStudent] = useState(null)

    useEffect(() => {
        api.getAll()
        .then(response => setStudentData(response.data))
        .catch(error => setErrorMessage(`Failed to load students: ${error.message}`))
    }, [])

    return (
        <div className="container">
            <NavBar />
            {errorMessage ?
                <div style={{backgroundColor: "red", width:"50%"}}>
                    {errorMessage}
                </div> : null
            }
            <InputStudent   updatedStudent={updatedStudent}
                            studentData={studentData} 
                            setStudentData={setStudentData} 
                            setUpdatedStudent={setUpdatedStudent} />
            <StudentList data={studentData} setUpdatedStudent={setUpdatedStudent} setStudentData={setStudentData} />
        </div>
    )
}