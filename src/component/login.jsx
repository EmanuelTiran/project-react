import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
export default function Login({ name, setName, password, setPassword, userId, setUserId }) {
    let matchedUser, id;
    const [users, setUsers] = useState([]);
    // const navigate = useNavigate();
    useEffect(() => {
        const getUserDetails = async () => {
            const response = await fetch("http://localhost:3000/users");
            const data = await response.json();
            setUsers(data);
            console.log("hi", data);
    
            const matchingUser = data.find(
                (user) => user.username === name && user.website === password
            );
    
            if (matchingUser) {
                setUserId(matchingUser.id);
                console.log("userID", matchingUser.id);
            } else {
                console.log('שם משתמש או סיסמה לא תואמים למשתמשים במערכת');
                // פעולות במקרה של כישלון בהתחברות
            }
        };
    
        (async () => await getUserDetails())();
    }, [name, password]);
    

    const handleInputName = (event) => {
        setName(event.target.value);
    };

    const handleInputPass = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit", users)
        if (users) {
            const matchingUser = users.find(
                (user) => {
                    id = user.id;
                    return user.username === name && user.website === password
                }
                );
                
                if (matchingUser) {
                    // setUserId(id);
                    console.log("userID", userId);
                    console.log("fix");

                // <Navigate to={'todos'}/>
                // navigate('/Home');
            } else {
                console.log('שם משתמש או סיסמה לא תואמים למשתמשים במערכת');
                // פעולות במקרה של כישלון בהתחברות
            }
        } else {
            console.log('נתוני המשתמשים אינם זמינים כרגע');
            // פעולות במקרה של נתונים לא זמינים
        }
    };


    return (
        <form onSubmit={handleSubmit}><input type="text" placeholder="userName" onChange={handleInputName} value={name} />
            <input type="password" name="password" id="password" value={password} placeholder="website" onChange={handleInputPass} />
            <button type="submit">Login</button>
        </form>
    )
}
