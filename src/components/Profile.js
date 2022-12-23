import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Input from "./Input";
import axios from "axios";
// import "./styles.css";

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
      const response = await axios.put(`/profiles/${profile._id}`, user);
    } catch (error) {
      console.log(error);
    }
  };
  return (
<>
    
  

<Table responsive striped bordered hover>
             <thead>
                 <tr>
                     <th>Client Id</th>
                     <th>Client Name</th>
                     <th>Email</th>
                     <th></th>
                 </tr>
             </thead>
             <tbody>
                 {/* {users.map((user) => ( */}
                     <tr>
                         <td>{user._id}</td>
                         <td>{user.name}</td>
                         <td>{user.email}</td>
                         {/* <td>
                    
                     <Link to={`/profiles/${profile.id}`} className="btn btn-warning">
                         Edit
                     </Link>
                 </td> */}
                                            </tr>
                 {/* ))} */}
             </tbody>
         </Table>

         <div >
      <h1>{user.name}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          value={user.name}
          placeholder={"Your names"}
          handleInput={handleInput}
        />
        <br />
        <Input
          name="email"
          type="email"
          value={user.email}
          placeholder={"Your email"}
          handleInput={handleInput}
        />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>

</>
  );
}






// import React, { useEffect, useState } from "react";
// import { Table, Button } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import axios from "../axios";
// import { Link } from "react-router-dom";
// // import { useDeleteProfileMutation } from "../storeService/appApi";
// // import Loading from "./Loading";

// function ProfilePage({pictures, _id, name, email}) {
//     const profile = useSelector((state) => state.profile);
//     const user = useSelector((state) => state.user);
//     const [users, setUsers] = useState([]);
//     const [profiles, setProfiles] = useState([]);
//     // const [loading, setLoading] = useState(false);
//     // const [deleteProfile] = useDeleteProfileMutation();

//     // function handleDeleteProfile(id) {
//     //     // logic here
//     //     if (window.confirm("Are you sure?")) deleteProfile({ product_id: id, user_id: user._id });
//     // }

//     useEffect(() => {
//         // setLoading(true);
//         axios
//             .get(`/users/${user._id}`)
//             .then(({ data }) => {
//                 // setLoading(false);
//                 setUsers(data);
//             })
//             // .get(`/profiles/${profile._id}`)
//             // .then(({ data }) => {
//             //     // setLoading(false);
//             //     setProfiles(data);
//             // })
//             .catch((e) => {
//                 // setLoading(false);
//                 console.log(e);
//             });
//     }, [user._id]);

//        // function TableRow({ pictures, _id, name, price }) {
//     //     return (
//     //         <tr>
//     //             <td>
//     //                 <img src={pictures[0].url} alt="Book" className="dashboard-product-preview" />
//     //             </td>
//     //             <td>{_id}</td>
//     //             <td>{name}</td>
//     //             <td>{price}</td>
//     //             <td>
//     //                 {/* <Button onClick={() => handleDeleteProfile(_id, user._id)} >
//     //                     Delete
//     //                 </Button> */}
//     //                 <Link to={`/user/${user._id}/updateProfile`} className="btn btn-warning">
                    
//     //                     Edit
//     //                 </Link>
//     //             </td>
//     //         </tr>
//     //     );
//     // }

//     // if (loading) return <Loading />;
//     // if (users?.length === 0) return <h2 className="py-2 text-center">No users yet</h2>;

//     return (
//         <Table responsive striped bordered hover>
//             <thead>
//                 <tr>
//                     <th>Client Id</th>
//                     <th>Client Name</th>
//                     <th>Email</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {/* {users.map((user) => ( */}
//                     <tr>
//                         <td>{user._id}</td>
//                         <td>{user.name}</td>
//                         <td>{user.email}</td>
//                         <td>
//                     {/* <Button onClick={() => handleDeleteProfile(_id, user._id)} >
//                         Delete
//                     </Button> */}
//                     <Link to={`/profiles/${profile.id}`} className="btn btn-warning">
//                         Edit
//                     </Link>
//                 </td>
//                                            </tr>
//                 {/* ))} */}
//             </tbody>
//         </Table>
//     );
// }
// export default ProfilePage;