import NavBar from "./NavBar";
import StudentList from "./StudentList";
import InputStudent from "./InputField";
import { useState ,useEffect, useMemo } from "react";

import Api from "../Api";

export default function StudentManagerApp() {
    
    const [inputStudent, setInputStudent] = useState({
        name: "",
        email: "",
        age: "",
      });

    const [studentData, setStudentData] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [isCreate, setIsCreate] = useState(true)
    const [loadData, setLoadData] = useState(true)
    
    const api = useMemo(() => new Api(), []);
    
    useEffect(() => {
        const fetchData = async () => {
          const result = await api.getAll();
          if (!result.data) {
            setErrorMessage(`Failed to load students: ${result.message}`)
        } else {
            setStudentData(result.data)
        }
       }
       loadData && fetchData();
       setLoadData(false)
    }, [api, loadData])

    const remove = async (id) => {
        await api.delete(id);
        setLoadData(true)
    }

    return (
        <div className="container">
            <NavBar />
            {errorMessage ?
                <div style={{backgroundColor: "red", width:"50%"}}>
                    {errorMessage}
                </div> : null
            }
            <InputStudent inputStudent={inputStudent} setLoadData={setLoadData} setInputStudent={setInputStudent} isCreate={isCreate} setIsCreate={setIsCreate} api={api}/>
            <StudentList data={studentData} setLoadData={setLoadData} setInputStudent={setInputStudent} setIsCreate={setIsCreate} remove={remove} />
        </div>
    )
}