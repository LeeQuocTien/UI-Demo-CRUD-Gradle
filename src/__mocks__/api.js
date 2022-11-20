const mockData = {
    data: [
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
}

const mockNewStudent = {
    id: 3,
    name: "Jack",
    email: "jack@gmail.com",
    age: 20
}

const mockUpdateStudent = {
    id: 1,
    name: "Tom",
    email: "tom@gmail.com",
    age: 21
}
const deleteStudent = mockData.data[1]

export default {
    getAll: jest.fn().mockResolvedValue(mockData),
    create: jest.fn(mockNewStudent).mockResolvedValue(mockNewStudent),
    update: jest.fn(mockUpdateStudent).mockResolvedValue(mockUpdateStudent),
    delete: jest.fn(deleteStudent.id).mockResolvedValue(deleteStudent)
}