import { useState } from "react";

export default function InputStudent({inputStudent, setLoadData, setInputStudent, isCreate, setIsCreate, api}) {

  const [errorInputMessage, setErrorInputMessage] = useState(null)

  const changeHand = (e) => {
    setInputStudent({
        ...inputStudent,
        [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputStudent.name && inputStudent.email && inputStudent.age) {

      let result = isCreate ? await api.create(inputStudent) : await api.update(inputStudent);
    
      if (!result.data) {
        setErrorInputMessage( `Failed to ${isCreate ? "create" : "update"} record: ${result.message}`)
      } else {
        setErrorInputMessage(null);
        setInputStudent({
          name: "",
          email: "",
          age: "",
        });
        setIsCreate(true)
        setLoadData(true)
      }
    } else {
        setErrorInputMessage("Please provide valid data");
    }
  }

  const cancelClick = (e) => {
    e.preventDefault();
    setInputStudent({
      name: "",
      email: "",
      age: "",
    });
    setIsCreate(true)
  }

  return (
      <div className="input-field">
          {errorInputMessage ?
            <div style={{backgroundColor: "red", width:"50%"}}>
                {errorInputMessage}
            </div> : null
          }

          <form className="input-field__form" action="" onSubmit={handleSubmit}>
              <input placeholder="Student Name" className="input-field__form-input" type="text" name="name" value={inputStudent.name} onChange={(e) => changeHand(e)} onClick={() => setErrorInputMessage(null)} />
              <input placeholder="Student Email" className="input-field__form-input" type="text" name="email" value={inputStudent.email} onChange={(e) => changeHand(e)} onClick={() => setErrorInputMessage(null)} />
              <input placeholder="Student Age" className="input-field__form-input" type="text" name="age" value={inputStudent.age} onChange={(e) => changeHand(e)} onClick={() => setErrorInputMessage(null)} />
              <div>
                <button className="input-field__form-button">{isCreate ? "Add Student" : "Update Student"}</button>
                <button className="input-field__form-button" onClick={cancelClick}>Cancel</button>
              </div>
          </form>
      </div>
  )
}
