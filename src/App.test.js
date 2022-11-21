import React from 'react'
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import api from "./Api";

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

const setErrorMessage = jest.fn()

const setUpdatedStudent = jest.fn() 

describe("App", () => {
    test('render app before fetch', () => {
        render(<App />);

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const studentIdElement = screen.queryByText(/ID/i);
        const errorMessageElement = screen.queryByTestId("app-message")

        expect(studentNameInput).toBeInTheDocument();
        expect(studentEmailInput).toBeInTheDocument();
        expect(studentAgeInput).toBeInTheDocument();
        expect(studentIdElement).not.toBeInTheDocument();
        expect(errorMessageElement).not.toBeInTheDocument();

    });

    test('render app when run useEffect', async () => {

    jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => [[], setStudentData])
    .mockImplementationOnce(() => [null, setErrorMessage])
    .mockImplementationOnce(() => [null, setUpdatedStudent])

        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({data: [...data]}))
        const getSpy = jest.spyOn(api, "getAll")

        await act( async () => {render(<App />)})

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const studentIdElement = screen.queryByText(/ID/i);
        const errorMessageElement = screen.queryByTestId("app-message")
        // const editStudentButton = screen.getByTestId("student-edit-1");
        
        

        expect(studentNameInput).toBeInTheDocument();
        expect(studentEmailInput).toBeInTheDocument();
        expect(studentAgeInput).toBeInTheDocument();
        expect(studentIdElement).not.toBeInTheDocument();
        expect(errorMessageElement).not.toBeInTheDocument();
        // expect(editStudentButton).toBeInTheDocument()


        expect(getSpy).toHaveBeenCalled()
        expect(setStudentData).toHaveBeenCalledWith("hufds")

    });
})

