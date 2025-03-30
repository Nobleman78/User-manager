import React from 'react';

const Home = () => {
    const handleAddUser = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = { name, email }
        form.reset();


        // *-----Fetching the data to send data to the server-----*

        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div>
            <h2>Welcome to the simple CRUD Client</h2>
            <form onSubmit={handleAddUser} action="">
                <input type="text" name='name' id='' />
                <br />
                <br />
                <input type="email" name='email' id='' />
                <br />
                <br />

                <input type="submit" value="Add User" />
            </form>
        </div>

    );
};

export default Home;
