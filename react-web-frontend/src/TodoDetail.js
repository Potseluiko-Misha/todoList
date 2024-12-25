/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { baseURL } from './utility.js';
import { TokenContext } from './utility.js';

export default function TodoDetail() {
    const [todo, setTodo] = useState(undefined);
    const token = useContext(TokenContext);
    const { id } = useParams();

    useEffect(() => {
        if (!token) return;
        (async () => {
            const response = await fetch(`${baseURL}${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok)
                setTodo((await response.json()).todo);
            else
                window.alert(response.status + ': ' +
                             response.statusText);
        })();
    }, [token, id]);

    return (
        <>
            {!token && <Navigate to="/login" />}
            {token && todo &&
                <>
                    {todo.done && <p>Выполнено.</p>}
                    <h1>{todo.title}</h1>
                    {todo.desc && <p>{todo.desc}</p>}
                    <p className="datetime">Создано: 
                       {new Date(todo.createdAt).toLocaleString()}</p>
                    {todo.addendum &&
                        <p className="addendum">
                            <img src={`${baseURL}uploaded/${todo.addendum}`} />
                        </p>
                    }
                </>
            }
        </>
    );
}
