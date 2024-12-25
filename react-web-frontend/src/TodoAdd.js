import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { baseURL, TokenContext } from './utility.js';

export default function TodoAdd() {
    const [t, setT] = useState('');
    const [d, setD] = useState('');
    const [a, setA] = useState(undefined);
    const [errors, setErrors] = useState({});
    const token = useContext(TokenContext);
    const redirect = useNavigate();

    function handleFileChange(evt) {
        const cFiles = evt.target.files;
        if (cFiles.length > 0)
            setA(cFiles[0]);
        else
            setA(undefined);
    }

    async function handleFormSubmit(evt) {
        evt.preventDefault();
        const body = new FormData();
        body.append('title', t);
        body.append('desc', d);
        if (a)
            body.append('addendum', a, a.name);
        const response = await fetch(`${baseURL}`, {
            method: 'POST',
            body: body,
            headers: {
                Authorization: `Bearer ${token}`
            }
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
            {!token && <Navigate to="/login" />}
            {token &&
                <>
                    <h1>Добавление дела</h1>
                    <form onSubmit={handleFormSubmit}>
                        <label>Заголовок</label>
                        <input value={t}
                               onChange={(evt) => {
                                   setT(evt.target.value)}
                               } />
                        {errors.title &&
                            <div><span className="label error">
                                {errors.title.msg}
                            </span></div>
                        }
                        <label>Описание</label>
                        <textarea onChange={(evt) => {
                                      setD(evt.target.value)}
                                  }>
                                  {d}</textarea>
                        <label>Иллюстрация</label>
                        <input type="file" accept="image/*"
                               onChange={handleFileChange} />
                        {errors.addendum &&
                            <div><span className="label error">
                                {errors.addendum.msg}
                            </span></div>
                        }
                        <div className="horizontal">
                            <input type="submit" value="Добавить" />
                        </div>
                    </form>
                </>
            }
        </>
    );
}
