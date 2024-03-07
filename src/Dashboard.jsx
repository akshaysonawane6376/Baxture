import React, { useEffect, useState } from 'react';

const Dashboard = () => {

    const [users, setUsers] = useState([]);
    const userPlus = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-plus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M16 19h6" /><path d="M19 16v6" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /></svg>
    const userMinus = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-minus" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4c.348 0 .686 .045 1.009 .128" /><path d="M16 19h6" /></svg>
    const deleteButton = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
    const atIcon = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-at" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" /></svg>
    const phoneIcon = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-phone-call" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" /></svg>
    const worldIcon = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-world" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>
    const starIcon = <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
    const color = ['red', 'blue', 'pink', 'green', 'yellow', 'skyblue'];

    const getUsers = async () => {
        let userData = await fetch('https://jsonplaceholder.typicode.com/users');
        let userArr = await userData.json();
        for (let i = 0; i < userArr.length; i++) {
            userArr[i].follow = 0;
            let name = userArr[i].name;
            let index = name.indexOf(' ');
            userArr[i].initials = name.substring(0,1) + name.substring(index+1, index+2);
            let ran = Math.floor(Math.random()*6);
            userArr[i].color = color[ran];
        }
        setUsers(userArr);
    }

    useEffect(() => {
        getUsers();
    },[]);

    const followUnFollow = (id) => {
        let userArr = users;
        for (let i = 0; i < userArr.length; i++) {
            if (userArr[i].id === id) {
                userArr[i].follow = userArr[i].follow === 0 ? 1 : 0;
            }
        }
        setUsers(userArr);
        deleteUser(null);
    }

    const deleteUser = (id) => {
        const newUsers = users.filter((user) => { return user.id !== id });
        setUsers(newUsers);
    }


    return (
        <div className='d-flex flex-wrap'>
            {users?.map((user, index) => (
                <div key={index} className="card ms-5 mt-5" style={{ width: '20rem' }}>
                    <div className="card-body">
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                            <h1 style={{backgroundColor:user.color, display:'flex', alignItems:'center', justifyContent:'center', width: '100px', height: '100px', borderRadius: '50%' }}>{user.initials}</h1>
                            <h5 className="card-title">{user?.name}  {user?.follow === 1 ?  starIcon: ''}</h5>
                        </div>
                        <a href='/' className="card-text text-dark">{atIcon}   {user?.email}</a><br />
                        <a href='/' className="card-text text-dark">{phoneIcon}   {user?.phone}</a><br />
                        <a href='/' className="card-text text-dark">{worldIcon}   {user?.website}</a><br />
                        <button onClick={(e) => { followUnFollow(user?.id) }} style={{ width: '120px' }} className={"btn "+(user.follow===0?" btn-primary": "btn-light border border-primary ms-1")}>{user?.follow === 0 ? userPlus : userMinus}  {user?.follow === 0 ? 'Follow' : 'Unfollow'}</button>
                        <button onClick={(e) => { deleteUser(user?.id) }} style={{ width: '80px' }} className="w-50 btn btn-light border border-primary ms-1">{deleteButton}  Delete</button>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Dashboard
