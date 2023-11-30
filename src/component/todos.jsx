import React, { useState, useEffect } from "react";

export default function Todos({ userId, completed }) {
    const [todos, setTodos] = useState([]);
    const [sort, setSort] = useState('');
    // http://localhost:3005/todos?userId=${currentUser[1]}

    useEffect(() => {
        const getListToDos = async () => {
            const response = await fetch(`http://localhost:3000/todos?userId=${userId}`);
            const data = await response.json();
            setTodos(data);
        };

        getListToDos();
    }, []);

    useEffect(() => {
        console.log("Updated todos:", todos);
    }, [todos]);

    const titlesArray = todos.map((todo, index) => (
        <div key={index}>
            <label>
                <span>{index + 1}.</span>
                <span>{todo.title}</span>
                <input type="checkbox" name="" id="" checked={todo.completed} />
            </label>
        </div>
    ));
    const handleChange = (event) => {
        const sorted = event.target.value
        setSort(sorted);
        switch (sorted) {
            case 'abc':
                setTodos((data) => data.sort((a, b) => (a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0))
                break;
            case 'random':
                setTodos((data) => data.sort(() => Math.random() > .5 ? 1 : -1))
                break;
            case 'unchacked first':
                setTodos((data) => data.sort((a, b) => (a.completed) ? 1 : -1))
                break;
            default:
                setTodos((data) => data.sort((a, b) => (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0))
                break;
        }
    };
    return (
        <div>
            <h1>Todos</h1>
            <select
                value={sort}
                label="sort"
                onChange={handleChange}>
                <option value={'123'}>123</option>
                <option value={'abc'}>abc</option>
                <option value={'random'}>random</option>
                <option value={'unchacked first'}>unchacked first</option>
            </select>
            {titlesArray}
        </div>
    );
}
