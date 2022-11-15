import NavBar from "./NavBar";
import StudentList from "./StudentList";
import InputStudent from "./InputField";
import { useState, useEffect } from "react";

import api from "../Api";

export default function StudentManagerApp() {
    const studentEntity = {
        name: "",
        email: "",
        age: "",
    }

    const [inputStudent, setInputStudent] = useState(studentEntity);
    const [studentData, setStudentData] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [isCreate, setIsCreate] = useState(true)
    const [updatedStudent, setUpdatedStudent] = useState(null)

    useEffect(() => {
        api.getAll()
        .then(response => setStudentData(response.data))
        .catch(error => setErrorMessage(`Failed to load students: ${error}`))
    }, [])

    const changeHand = (e) => {
        setInputStudent({
            ...inputStudent,
            [e.target.name]: e.target.value
        })
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputStudent.name && inputStudent.email && inputStudent.age) {
    
            let result = isCreate ? await api.create({"name": "asdas", "email": "mike@gmail.com", "age": 20}) : await api.update({"id": "1","name": "asdas", "email": "mike@gmail.com", "age": 20});

            if (!result.data) {
                setErrorMessage( `Failed to ${isCreate ? "create" : "update"} record: ${result.message}`)
            } else {
                const updatedData = [...studentData.slice(0, updatedStudent), result.data, ...studentData.slice(updatedStudent + 1)]
                
                isCreate ? setStudentData([...studentData, result.data]) : setStudentData([...updatedData])
                setErrorMessage(null)
                setInputStudent(studentEntity)
                setIsCreate(true)
            }
        } else {
            setErrorMessage("Please provide valid data");
        }
    }
  
    const cancelClick = (e) => {
        e.preventDefault();
        setInputStudent(studentEntity);
        setIsCreate(true)
    }

    const handleClick = () => { setErrorMessage(null) }

    const remove = ( id, indx ) => {
        setErrorMessage(null) 
        api.delete(id);
        const deletedData = [...studentData.slice(0, indx), ...studentData.slice(indx + 1)]
        setStudentData(deletedData)
    }
 
    const editStudent = (student, indx) => {
        setErrorMessage(null)
        setInputStudent(student);
        setIsCreate(false);
        setUpdatedStudent(indx)
    }

    return (
        <div className="container">
            <NavBar />
            {errorMessage ?
                <div style={{backgroundColor: "red", width:"50%"}}>
                    {errorMessage}
                </div> : null
            }
            <InputStudent inputStudent={inputStudent} isCreate={isCreate} cancelClick={cancelClick} handleSubmit={handleSubmit} changeHand={changeHand} handleClick={handleClick} />
            <StudentList data={studentData} editStudent={editStudent} remove={remove} />
        </div>
    )
}