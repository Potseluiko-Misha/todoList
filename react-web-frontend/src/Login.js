import { useState } from 'react';

import { baseURL } from './utility.js';

export default function Login({ acceptToken }) {
    const [un, setUN] = useState('');
    const [p, setP] = useState('');
    const [errors, setErrors] = useState({});

    async function handleFormSubmit(evt) {
        evt.preventDefault();
        const body = new URLSearchParams();
        body.append('username', un);
        body.append('password', p);
        const response = await fetch(`${baseURL}login/`, {
            method: 'POST',
            body: body
        });
        if (response.ok)
            acceptToken((await response.json()).token);
        else if (response.status == 406)
            setErrors((await response.json()).errors);
        else
            window.alert(response.status + ': ' +
                         response.statusText);
    }

    return (
        <>
            <h1>Вход</h1>
            <form onSubmit={handleFormSubmit}>
                <label>Имя пользователя</label>
                <input value={un}
                     onChange={(evt) => {setUN(evt.target.value)}} />
                {errors.username &&
                    <div><span className="label error">
                        {errors.username.msg}
                    </span></div>
                }
                <label>Пароль</label>
                <input type="password" value={p}
                       onChange={(evt) => {setP(evt.target.value)}} />
                {errors.password &&
                    <div><span className="label error">
                        {errors.password.msg}
                    </span></div>
                }
                <div className="horizontal">
                    <input type="submit" value="Войти" />
                </div>
            </form>
        </>
    );
}