import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'John Joe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Joe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users