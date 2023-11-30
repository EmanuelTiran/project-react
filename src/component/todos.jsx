import React, { useState, useEffect } from "react";

export default function Todos({ userId, completed }) {
    const [todos, setTodos] = useState([]);
    const [sort, setSort] = useState('');
    const [newTodo, setNewTodo] = useState('');
    const [deleteId, setDeleteId] = useState('');
    const [updateTitle, setUpdateTitle] = useState('');
    const [updateCompleted, setUpdateCompleted] = useState('');
    // http://localhost:3005/todos?userId=${currentUser[1]}

    useEffect(() => {
        const getListToDos = async () => {
            const response = await fetch(`http://localhost:3000/todos?userId=${userId}`);
            const data = await response.json();
            setTodos(data);
        };

        getListToDos();
    }, [userId]);

    const handleAddTodo = async () => {
        try {
            const response = await fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    title: newTodo,
                    completed: false
                })
            });
            const data = await response.json();
            setTodos([...todos, data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleDeleteTodo = async (idToDelete) => {
        try {
            await fetch(`http://localhost:3000/todos/${deleteId}`, {
                method: 'DELETE'
            });
            const updatedTodos = todos.filter(todo => todo.id !== idToDelete);
            setTodos(updatedTodos);
            setDeleteId('');
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleUpdateTitle = async (id, newTitle) => {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle })
            });
            const updatedTodo = await response.json();
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, title: updatedTodo.title } : todo
            );
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error updating title:', error);
        }
    };

    const handleUpdateCompleted = async (id, completedStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: completedStatus })
            });
            const updatedTodo = await response.json();
            const updatedTodos = todos.map(todo =>
                todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
            );
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error updating completed status:', error);
        }
    };
    useEffect(() => {
        console.log("Updated todos:", todos);
    }, [todos]);

    const titlesArray = todos.map((todo,i) => (
        <div key={todo.id}>
            <label>
                <span>{i+1}.</span>
                <span>{todo.title}</span>
                <input type="checkbox" name="" id="" checked={todo.completed} />
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
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
            case 'unCompleted first':
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

            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="New Todo"
            />
            <button onClick={handleAddTodo}>Add Todo</button>
<br />
            <input
                type="text"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
                placeholder="Todo ID to update title"
            />
            <input
                type="text"
                value={updateCompleted}
                onChange={(e) => setUpdateCompleted(e.target.value)}
                placeholder="Todo ID to update completed (true/false)"
            />
            <button onClick={() => handleUpdateTitle(parseInt(updateTitle), updateTitle)}>
                Update Title
            </button>
            <button onClick={() => handleUpdateCompleted(parseInt(updateCompleted), updateCompleted === 'true')}>
                Update Completed
            </button>
            <br />

            <label>
    Update Completed:
    <input
        type="checkbox"
        checked={updateCompleted === 'true'} // הצבת ה־checkbox למצב מסומן בהתאם לערך המתקבל
        onChange={(e) => setUpdateCompleted(e.target.checked ? 'true' : 'false')} // התאמה של הערך לטיפול נכון עם העדכון
    />
    <br />
</label>Sort
            <select
                value={sort}
                label="sort"
                onChange={handleChange}>
                <option value={'123'}>123</option>
                <option value={'abc'}>abc</option>
                <option value={'random'}>random</option>
                <option value={'unCompleted first'}>unCompleted first</option>
            </select>
           <div id="listTodo">{titlesArray}</div> 
        </div>
    );
}
