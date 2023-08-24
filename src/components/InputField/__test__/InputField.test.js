import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import InputStudent from '../InputField';
import api from '../../../Api';
const data = [
    { "age": 18, "email": "lee@gmail.com", "id": 1, "name": "Lee" }, 
    { "age": 19, "email": "mike@gmail.com", "id": 2, "name": "Mike" }, 
]

const newStudent = { id: 3, name: "Leo", email: "leo@gmail.com", age: 21 }

const updatedStudent = { id: 2, name: "Jack", email: "jack@gmail.com", age: 20 }

const addNewData = [
    { "age": 18, "email": "lee@gmail.com", "id": 1, "name": "Lee" }, 
    { "age": 19, "email": "mike@gmail.com", "id": 2, "name": "Mike" }, 
    { "age": 21, "email": "leo@gmail.com", "id": 3, "name": "Leo" }
]


const updatedData = [
    { id: 1, name: "Lee", email: "lee@gmail.com", age: 18 },
    { id: 2, name: "Jack", email: "jack@gmail.com", age: 20 }
]

const setStudentData = jest.fn()

const setUpdatedStudent = jest.fn() 

describe("InputField", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('render inputfield without updatedStudent', () => {

        render(<InputStudent studentData={data} updatedStudent={null} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const errorMessageElement = screen.queryByTestId("input-message")
        const addStudentButton = screen.getByText(/Add Student/i)
        const cancelButton = screen.getByText(/Cancel/i)

        expect(studentNameInput).toBeInTheDocument();
        expect(studentEmailInput).toBeInTheDocument();
        expect(studentAgeInput).toBeInTheDocument();
        expect(errorMessageElement).not.toBeInTheDocument();
        expect(addStudentButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()

    });

    test('render inputfield with updatedStudent', () => {

        render(<InputStudent studentData={data} updatedStudent={updatedStudent} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const errorMessageElement = screen.queryByTestId("input-message")
        const updateStudentButton = screen.getByText(/Update Student/i)
        const cancelButton = screen.getByText(/Cancel/i)

        expect(studentNameInput).toBeInTheDocument();
        expect(studentEmailInput).toBeInTheDocument();
        expect(studentAgeInput).toBeInTheDocument();
        expect(errorMessageElement).not.toBeInTheDocument();
        expect(updateStudentButton).toBeInTheDocument()
        expect(cancelButton).toBeInTheDocument()

        expect(studentNameInput.value).toBe("Jack")
        expect(studentEmailInput.value).toBe("jack@gmail.com")
        expect(studentAgeInput.value).toBe("20")

    });

    test('should able to change all input fields when error not exist', () => {

        render(<InputStudent studentData={data} updatedStudent={null} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const errorMessageElement = screen.queryByTestId("input-message")

        expect(errorMessageElement).not.toBeInTheDocument();

        expect(studentNameInput.value).toBe("")
        expect(studentEmailInput.value).toBe("")
        expect(studentAgeInput.value).toBe("")

        fireEvent.change(studentNameInput, { target: { value: newStudent.name }})
        fireEvent.change(studentEmailInput, { target: { value: newStudent.email }})
        fireEvent.change(studentAgeInput, { target: { value: newStudent.age }})

        expect(studentNameInput.value).toBe("Leo")
        expect(studentEmailInput.value).toBe("leo@gmail.com")
        expect(studentAgeInput.value).toBe("21")

    });

    test('should able to change all input fields when error exist', () => {

        render(<InputStudent studentData={data} updatedStudent={null} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const errorMessageElement = screen.queryByTestId("input-message")
        const addStudentButton = screen.getByText(/Add Student/i)

        expect(errorMessageElement).not.toBeInTheDocument()
        expect(studentNameInput.value).toBe("")
        expect(studentEmailInput.value).toBe("")
        expect(studentAgeInput.value).toBe("")
        expect(addStudentButton).toBeInTheDocument()

        fireEvent.click(addStudentButton)
        const errorMessageElementAfterClick = screen.getByTestId("input-message")
        expect(errorMessageElementAfterClick).toHaveTextContent("Please provide valid data")

        fireEvent.change(studentNameInput, { target: { value: newStudent.name }})
        fireEvent.change(studentEmailInput, { target: { value: newStudent.email }})
        fireEvent.change(studentAgeInput, { target: { value: newStudent.age }})

        expect(studentNameInput.value).toBe("Leo")
        expect(studentEmailInput.value).toBe("leo@gmail.com")
        expect(studentAgeInput.value).toBe("21")
        const errorMessageElementAfterChange = screen.queryByTestId("input-message")
        expect(errorMessageElementAfterChange).not.toBeInTheDocument()

    });

    test('should able to click cancel in inputfield with value and without updatedStudent', () => {

        render(<InputStudent studentData={data} updatedStudent={null} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        
        const cancelButton = screen.getByText(/Cancel/i)

        expect(cancelButton).toBeInTheDocument()

        fireEvent.change(studentNameInput, { target: { value: newStudent.name }})
        fireEvent.change(studentEmailInput, { target: { value: newStudent.email }})
        fireEvent.change(studentAgeInput, { target: { value: newStudent.age }})

        expect(studentNameInput.value).toBe("Leo")
        expect(studentEmailInput.value).toBe("leo@gmail.com")
        expect(studentAgeInput.value).toBe("21")

        fireEvent.click(cancelButton)
        expect(studentNameInput.value).toBe("")
        expect(studentEmailInput.value).toBe("")
        expect(studentAgeInput.value).toBe("")

        expect(setUpdatedStudent).toHaveBeenCalledWith(null)

    });

    test('should able to click cancel in inputfield with updatedStudent', () => {

        render(<InputStudent studentData={data} updatedStudent={updatedStudent} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />);

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const cancelButton = screen.getByText(/Cancel/i)
        const updateStudentButton = screen.getByText(/Update Student/i)

        expect(cancelButton).toBeInTheDocument()
        expect(updateStudentButton).toBeInTheDocument()

        expect(studentNameInput.value).toBe("Jack")
        expect(studentEmailInput.value).toBe("jack@gmail.com")
        expect(studentAgeInput.value).toBe("20")

        fireEvent.click(cancelButton)

        expect(studentNameInput.value).toBe("")
        expect(studentEmailInput.value).toBe("")
        expect(studentAgeInput.value).toBe("")

        expect(setUpdatedStudent).toBeCalledWith(null)

    });

    test('should able to click addnew button in inputfield success', async () => {

        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({data: {...newStudent}}))
        const createSpy = jest.spyOn(api, "create")

        render(<InputStudent studentData={data} updatedStudent={null} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />) 
        
        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const addStudentButton = screen.getByText(/Add Student/i)

        expect(addStudentButton).toBeInTheDocument()
        expect(studentNameInput.value).toBe("")
        expect(studentEmailInput.value).toBe("")
        expect(studentAgeInput.value).toBe("")

        fireEvent.change(studentNameInput, { target: { value: newStudent.name }})
        fireEvent.change(studentEmailInput, { target: { value: newStudent.email }})
        fireEvent.change(studentAgeInput, { target: { value: newStudent.age }})

        expect(studentNameInput.value).toBe("Leo")
        expect(studentEmailInput.value).toBe("leo@gmail.com")
        expect(studentAgeInput.value).toBe("21")

        await act( async () => { fireEvent.click(addStudentButton) })
        const studentNameInputAfterClick = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInputAfterClick = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInputAfterClick = screen.getByPlaceholderText(/Student Age/i);


        expect(studentNameInputAfterClick.value).toBe("")
        expect(studentEmailInputAfterClick.value).toBe("")
        expect(studentAgeInputAfterClick.value).toBe("")

        expect(createSpy).toHaveBeenCalled()
        expect(setStudentData).toHaveBeenCalledWith(addNewData)
        expect(setUpdatedStudent).toHaveBeenCalledWith(null)

    });

    test('should able to click update button in inputfield success', async () => {

        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({data: {...updatedStudent}}))
        const updateSpy = jest.spyOn(api, "update")

        render(<InputStudent studentData={data} updatedStudent={updatedStudent} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />) 
        
        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const updateStudentButton = screen.getByText(/Update Student/i)        

        expect(updateStudentButton).toBeInTheDocument()

        expect(studentNameInput.value).toBe("Jack")
        expect(studentEmailInput.value).toBe("jack@gmail.com")
        expect(studentAgeInput.value).toBe("20")

        await act( async () => { fireEvent.click(updateStudentButton) })

        expect(studentNameInput.value).toBe("")
        expect(studentEmailInput.value).toBe("")
        expect(studentAgeInput.value).toBe("")

        expect(updateSpy).toHaveBeenCalled()
        expect(setStudentData).toHaveBeenCalledWith(updatedData)
        expect(setUpdatedStudent).toHaveBeenCalledWith(null)

    });

    test('should able to click addnew button in inputfield response fail', async () => {

        global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject({message: "email taken"}))
        const createSpy = jest.spyOn(api, "create")

        render(<InputStudent studentData={data} updatedStudent={null} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />) 
        
        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const addStudentButton = screen.getByText(/Add Student/i)

        expect(addStudentButton).toBeInTheDocument()
        expect(studentNameInput.value).toBe("")
        expect(studentEmailInput.value).toBe("")
        expect(studentAgeInput.value).toBe("")

        fireEvent.change(studentNameInput, { target: { value: "Mike1" }})
        fireEvent.change(studentEmailInput, { target: { value: "mike@gmail.com" }})
        fireEvent.change(studentAgeInput, { target: { value: "21" }})

        expect(studentNameInput.value).toBe("Mike1")
        expect(studentEmailInput.value).toBe("mike@gmail.com")
        expect(studentAgeInput.value).toBe("21")

        await act( async () => { fireEvent.click(addStudentButton) })
        const errorMessageElement = screen.getByTestId("input-message")

        expect(studentNameInput.value).toBe("Mike1")
        expect(studentEmailInput.value).toBe("mike@gmail.com")
        expect(studentAgeInput.value).toBe("21")

        expect(createSpy).toHaveBeenCalled()
        expect(errorMessageElement).toHaveTextContent("Failed to create with record: email taken")

    });

    test('should able to click update button in inputfield response fail', async () => {

        global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject({message: "email taken"}))
        const updateSpy = jest.spyOn(api, "update")

        render(<InputStudent studentData={data} updatedStudent={updatedStudent} setStudentData={setStudentData} setUpdatedStudent={setUpdatedStudent} />) 
        
        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const updateStudentButton = screen.getByText(/Update Student/i)        

        expect(updateStudentButton).toBeInTheDocument()

        expect(studentNameInput.value).toBe("Jack")
        expect(studentEmailInput.value).toBe("jack@gmail.com")
        expect(studentAgeInput.value).toBe("20")

        fireEvent.change(studentNameInput, { target: { value: "Jack" }})
        fireEvent.change(studentEmailInput, { target: { value: "mike@gmail.com" }})
        fireEvent.change(studentAgeInput, { target: { value: "20" }})

        expect(studentNameInput.value).toBe("Jack")
        expect(studentEmailInput.value).toBe("mike@gmail.com")
        expect(studentAgeInput.value).toBe("20")

        await act( async () => { fireEvent.click(updateStudentButton) })
        const errorMessageElement = screen.getByTestId("input-message")

        expect(studentNameInput.value).toBe("Jack")
        expect(studentEmailInput.value).toBe("mike@gmail.com")
        expect(studentAgeInput.value).toBe("20")

        expect(updateSpy).toHaveBeenCalled()
        expect(errorMessageElement).toHaveTextContent("Failed to update with record: email taken")

    });
    
})

