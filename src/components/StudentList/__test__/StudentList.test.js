import { fireEvent, render, screen } from '@testing-library/react';
import StudentList from '../StudentList';
import api from '../../../Api';
    
const data = [
    {
        id: 1,
        name: "Lee",
        email: "lee@gmail.com",
        age: 18
    },
    {
        id: 2,
        name: "Mike",
        email: "mike@gmail.com",
        age: 19
    }
]

const setStudentData = jest.fn()

const setUpdatedStudent = jest.fn() 

afterEach(() => {
    jest.restoreAllMocks();
});

test('should render all element in student element', () => {
    render(<StudentList data={data} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);
    const studentElementWithId1 = screen.getByTestId("student-div-1");
    const studentElementWithId2 = screen.getByTestId("student-div-2");

  
    expect(studentElementWithId1).toBeInTheDocument();
    expect(studentElementWithId2).toBeInTheDocument();

});


test('should able to click editStudent Button', () => {
    render(<StudentList data={data} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);
    const editStudentButton = screen.getByTestId("student-edit-1");
    
    expect(editStudentButton).toBeInTheDocument()
    fireEvent.click(editStudentButton)
    expect(setUpdatedStudent).toBeCalledWith(data[0])
});

test('should able to click remove Button', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve())
    const deleteSpy = jest.spyOn(api, "delete")

    render(<StudentList data={data} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent}  />);
    const removeButton = screen.getByTestId("student-remove-2");
    
    fireEvent.click(removeButton)
    expect(deleteSpy).toHaveBeenCalledWith(data[1].id)
    expect(setStudentData).toBeCalledWith([data[0]])
});
