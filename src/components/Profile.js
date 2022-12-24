import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Input from "./Input";
import axios from "axios";
import "../styles/Profile.css";

const INITIAL_STATE = {
    id: 0,
    name: "",
    email: ""
};
export default function App() {
    const [users, setUsers] = useState(INITIAL_STATE);
    const user = useSelector((state) => state.user);
    const profile = useSelector((state) => state.profile);
    useEffect(() => {

        axios
            .get(`/users/${user._id}`)
            .then(({ data }) => {

                setUsers(data);
            })

            .catch((e) => {

                console.log(e);
            });
    }, [user._id]);

    const handleInput = (e) => {
        console.log(e.target.name, " : ", e.target.value);
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Data for update : ", user);
            const response = await axios.put(`/users/${user._id}`, user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>Hi {user.name}!!! Welcome to your Profile</h1>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                </tbody>
            </Table>
            <div >
                <form onSubmit={handleSubmit}>
                    <Input
                        name="name"
                        type="text"
                        value={user.name}
                        placeholder={"Your names"}
                        handleInput={handleInput}
                    />
                    <br /><br></br>
                    <Input
                        name="email"
                        type="email"
                        value={user.email}
                        placeholder={"Your email"}
                        handleInput={handleInput}
                    />
                    <br /><br></br>
                    <button type="submit" value="Update"> Update  </button>
                </form>
            </div>
        </>
    );
}

