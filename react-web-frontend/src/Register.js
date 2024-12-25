import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { baseURL, TokenContext } from './utility.js';

export default function Register() {
    const [un, setUN] = useState('');
    const [p1, setP1] = useState('');
    const [p2, setP2] = useState('');
    const [errors, setErrors] = useState({});
    const token = useContext(TokenContext);
    const redirect = useNavigate();

    async function handleFormSubmit(evt) {
        evt.preventDefault();
        const body = new URLSearchParams();
        body.append('username', un);
        body.append('password', p1);
        body.append('password2', p2);
        const response = await fetch(`${baseURL}register/`, {
            method: 'POST',
            body: body
        });
        if (response.ok)
            redirect('/');
        else if (response.status == 406)
            setErrors((await response.json()).errors);
        else
            window.alert(response.status + ': ' +
                         response.statusText);
    }

    return (
        <>
            {token && <Navigate to="/" />}
            {!token &&
                <>
                    <h1>Регистрация</h1>
                    <form onSubmit={handleFormSubmit}>
                        <label>Имя пользователя</label>
                        <input value={un}
                               onChange={(evt) => {
                                   setUN(evt.target.value)}
                               } />
                        {errors.username &&
                            <div><span className="label error">
                                {errors.username.msg}
                            </span></div>
                        }
                        <label>Пароль</label>
                        <input type="password" value={p1}
                               onChange={(evt) => {
                                   setP1(evt.target.value)}
                               } />
                        {errors.password &&
                            <div><span className="label error">
                                {errors.password.msg}
                            </span></div>
                        }
                        <label>Повтор пароля</label>
                        <input type="password" value={p2}
                               onChange={(evt) => {
                                   setP2(evt.target.value)}
                               } />
                        {errors.password2 &&
                            <div><span className="label error">
                                {errors.password2.msg}
                            </span></div>
                        }
                        <div className="horizontal">
                            <input type="submit"
                                   value="Зарегистрировать" />
                        </div>
                    </form>
                </>
            }
        </>
    );
}
