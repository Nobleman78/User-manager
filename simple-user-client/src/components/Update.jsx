import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const Update = () => {
    const { id } = useParams();
    const [updateData, setUpdateData] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(res => res.json())
            .then(data => setUpdateData(data))
    }, [id])

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const user = { name, email };
        console.log(user);
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    alert('Updated Successfully.')
                }
            })

    }
    return (
        <div>
            <p style={{ fontSize: '20px', }}>Update Information of <span style={{ color: 'blue' }}>{updateData.name}</span> </p>
            <form onSubmit={handleUpdate} style={{ width: '400px', margin: 'auto', padding: '10px 5px' }} >
                <label htmlFor="">Name: </label>
                <input type="text" name='name' defaultValue={updateData.name} style={{ width: '70%', padding: '10px 10px', marginBottom: '5px' }} />
                <br />
                <label htmlFor="">Email: </label>
                <input type="text" name='email' defaultValue={updateData.email} style={{ width: '70%', padding: '10px 10px', marginBottom: '5px' }} />
                <br />
                <input style={{ background: 'blue', border: '1px solid blue', width: '76%', padding: '7px 10px', cursor: 'pointer', borderRadius: '5px', color: 'white', marginLeft: '45px' }} type="submit" />
            </form>
        </div>
    )

};

export default Update;