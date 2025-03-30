import React, { useState } from 'react';
import { Link } from 'react-router';




const Users = () => {
    const [users, setUsers] = useState([]);

    const handleDelete = (_id) => {
        console.log('Delete', _id)
        fetch(`http://localhost:5000/users/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('Delete Successfully.')
                }
            })


    }


    /* Getting data from the Api */

    fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => {
            setUsers(data)
        })

    return (
        <div>
            <h2>Users From Backend</h2>
            <p>Numer of Users : {users.length}</p>
           
            {
                users.map((user,index) =>
                    <div key={index} style={{ border: '1px solid gray', display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', width: '900px', margin: 'auto', marginTop: '10px' }}>
                        <p>ID: <span style={{ color: 'red' }}> {user._id} </span> | Name: <span style={{ color: 'green', fontSize: '20px' }}>{user.name} </span> | Email : <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}> {user.email}</span></p>
                         <Link style={{color:'white', border:'1px solid blue ', textDecoration:'none',padding:'5px 10px',background:'blue'}} to={`/update/${user._id}`}>Update</Link>
                        <button style={{color:'white', border:'1px solid red ', textDecoration:'none',cursor:'pointer',fontSize:'14px',padding:'7px 10px',background:'red'}}  onClick={() => handleDelete(user._id)}>Delete</button>
                    </div>
                )
            }

        </div>
    );
};

export default Users;

