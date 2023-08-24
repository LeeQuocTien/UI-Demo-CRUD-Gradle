import NavBar from "./components/NavBar/NavBar";
import StudentList from "./components/StudentList/StudentList";
import InputStudent from "./components/InputField/InputField";
import React from "react";

import api from "./Api";
import './App.css';

export default function App() {

    const [studentData, setStudentData] = React.useState([])
    const [errorMessage, setErrorMessage] = React.useState(null)
    const [updatedStudent, setUpdatedStudent] = React.useState(null)

    React.useEffect(() => {
        api.getAll()
        .then(response => setStudentData(response.data))
        .catch(error => setErrorMessage(`Failed to load students: ${error.message}`))
    }, [])

    return (
        <div className="container">
            <NavBar />
            {errorMessage ?
                <div data-testid="app-message" style={{backgroundColor: "red", width:"50%"}}>
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