export default function InputStudent({ inputStudent, isCreate, cancelClick, handleSubmit, changeHand, handleClick }) {

  return (
      <div className="input-field">
          <form className="input-field__form" action="" onSubmit={handleSubmit}>
              <input placeholder="Student Name" className="input-field__form-input" type="text" name="name" value={inputStudent.name} onChange={(e) => changeHand(e)} onClick={handleClick} />
              <input placeholder="Student Email" className="input-field__form-input" type="text" name="email" value={inputStudent.email} onChange={(e) => changeHand(e)} onClick={handleClick} />
              <input placeholder="Student Age" className="input-field__form-input" type="text" name="age" value={inputStudent.age} onChange={(e) => changeHand(e)} onClick={handleClick} />
              <div>
                <button className="input-field__form-button">{ isCreate ? "Add Student" : "Update Student" }</button>
                <button className="input-field__form-button" onClick={ cancelClick }>Cancel</button>
              </div>
          </form>
      </div>
  )
}
