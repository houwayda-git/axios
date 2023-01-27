import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import User from "./user";

export default function Users() {

    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false)
    const [detail, setDetail] = useState('')
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    const handleClose = () => setModal(false);

    const handleShow = () => {
        setModal(true)
        users.map((user, i) => {
            if (i + 1 === user.id) {
                setDetail(user)
            }
        })
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        setData(users)
    }, [])
    useEffect(() => {
        setData(users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())))
    }, [search, users])

    const fetchUsers = async () => {
        try {
            const response = await axios('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [])

    const row = data.map((user, i) => {
        return (
            <tr key={i}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.website}</td>
                <td>
                    <Button onClick={handleShow}>Details</Button>
                </td>
            </tr>

        )
    })
    return (<div className="container mt-sm-4">
        <div className="container mb-4">
            <input type="text"
                className="inputText"
                onChange={handleChange}
                value={search}
                placeholder="Search user name..."
            >
            </input>
        </div>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {row}
            </tbody>
        </Table>
        {modal ? <User modal={modal} handleClose={handleClose} detail={detail} /> : null}
    </div>)
}
