import { fireEvent, render, screen } from '@testing-library/react';
import StudentList from '../StudentList';
import api from '../../../api';
    
jest.mock("../../../Api");

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

test('should able to click editStudent Button', () => {
    render(<StudentList data={data} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);
    const editStudentButton = screen.getByTestId("student-edit-1");
    
    expect(editStudentButton).toBeInTheDocument()
    fireEvent.click(editStudentButton)
    expect(setUpdatedStudent).toBeCalledWith(data[0])
});

test('should able to click remove Button', async () => {
    // api.delete.mockResolvedValue()
    render(<StudentList data={data} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent}  />);
    const removeButton = screen.getByTestId("student-remove-2");
    
    fireEvent.click(removeButton)
    expect(api.delete).toBeCalledWith(data[1].id)
    api.delete(data[1].id).then(data => expect(data).toEqual(data[1]));
    expect(setStudentData).toBeCalledWith([data[0]])
});