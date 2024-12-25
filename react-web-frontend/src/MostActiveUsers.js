import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { baseURL } from './utility.js';
import { TokenContext } from './utility.js';

export default function MostActiveUsers() {
    const [mau, setMAU] = useState(undefined);
    const token = useContext(TokenContext);

    useEffect(() => {
        if (!token) return;
        (async () => {
            const response = await fetch(`${baseURL}mostactive/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok)
                setMAU(await response.json());
            else
                window.alert(response.status + ': ' +
                             response.statusText);
        })();
    }, [token]);

    return (
        <>
            {!token && <Navigate to="/login" />}
            {token && mau &&
                <>
                    <h1>Самые активные пользователи</h1>
                    <h2>Больше всего дел у пользователей:</h2>
                    <ul>
                        {mau.mostActiveAll.map((item) => (
                            <li key={item._id}>{item._id}: {item.cnt}</li>
                        ))}
                    </ul>
                    <h2>Больше всего выполненных дел у пользователей:</h2>
                    <ul>
                        {mau.mostActiveDone.map((item) => (
                            <li key={item._id}>{item._id}: {item.cnt}</li>
                        ))}
                    </ul>
                </>
            }
        </>
    );
}
