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

describe("App", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // test('render app before fetch', () => {

    //     jest
    //     .spyOn(React, 'useState')
    //     .mockImplementationOnce(() => [[], setStudentData])
    //     .mockImplementationOnce(() => [null, setErrorMessage])
    //     .mockImplementationOnce(() => [null, setUpdatedStudent])

    //     render(<App />);

    //     const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
    //     const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
    //     const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
    //     const studentIdElement = screen.queryByText(/ID/i);
    //     const errorMessageElement = screen.queryByTestId("app-message")

    //     expect(studentNameInput).toBeInTheDocument();
    //     expect(studentEmailInput).toBeInTheDocument();
    //     expect(studentAgeInput).toBeInTheDocument();
    //     expect(studentIdElement).not.toBeInTheDocument();
    //     expect(errorMessageElement).not.toBeInTheDocument();

    // });

    test('render app when fetch success', async () => {

        global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({data: [...data]}))
        const getSpy = jest.spyOn(api, "getAll")

        await act( async () => {render(<App />)})

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const errorMessageElement = screen.queryByTestId("app-message")
        const editStudentButton = screen.getByTestId("student-edit-1");
        const studentDivElement = screen.getAllByTestId(/student-div/i);

        expect(studentNameInput).toBeInTheDocument();
        expect(studentEmailInput).toBeInTheDocument();
        expect(studentAgeInput).toBeInTheDocument();
        expect(errorMessageElement).not.toBeInTheDocument();
        expect(editStudentButton).toBeInTheDocument()
        expect(studentDivElement.length).toBe(2)

        expect(getSpy).toHaveBeenCalled()

    });

    test('render app when fetch fail', async () => {

        global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject({message: "errorConnection"}))
        const getSpy = jest.spyOn(api, "getAll")

        await act( async () => {render(<App />)})

        const studentNameInput = screen.getByPlaceholderText(/Student Name/i);
        const studentEmailInput = screen.getByPlaceholderText(/Student Email/i);
        const studentAgeInput = screen.getByPlaceholderText(/Student Age/i);
        const errorMessageElement = screen.getByTestId("app-message")
        const studentIdElement = screen.queryByText(/ID/i);


        expect(studentNameInput).toBeInTheDocument();
        expect(studentEmailInput).toBeInTheDocument();
        expect(studentAgeInput).toBeInTheDocument();
        expect(errorMessageElement).toBeInTheDocument();
        expect(studentIdElement).not.toBeInTheDocument();

        expect(errorMessageElement).toHaveTextContent("Failed to load students: errorConnection")
        expect(getSpy).toHaveBeenCalled()
    });
})

