import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import TodoList from './TodoList.js';
import Login from './Login.js';
import Logout from './Logout.js';
import TodoDetail from './TodoDetail.js';
import TodoAdd from './TodoAdd.js';
import Register from './Register.js';
import MostActiveUsers from './MostActiveUsers.js';
import { TokenContext } from './utility.js';

function App() {
    const [token, setToken] = useState(undefined);

    function acceptToken(tkn) {
        setToken(tkn);
    }

    return (
        <BrowserRouter>
            <nav>
                {token &&
                    <Link to="/" className="brand">
                        <span>Список дел</span>
                    </Link>
                }
                <input id="bmenub"
                      type="checkbox" className="show" />
                <label htmlFor="bmenub"
                      className="burger pseudo button">&#9776;</label>
                <div className="menu">
                    {token && <Link to="/mostactive/" className="button">
                                    Самые активные пользователи</Link>}
                    {token && <Link to="/add/" className="button">
                                    Добавить дело</Link>}
                    {token && <Logout acceptToken={acceptToken} />}
                    {!token && <Link to="/register/"
                                     className="button">
                                     Зарегистрироваться</Link>}
                    {!token && <Link to="/login/"
                                     className="button success">
                                     Войти</Link>}
                </div>
            </nav>
            <TokenContext.Provider value={token}>
                <Routes>
                    <Route path="/" element={
                            <TodoList />
                    } />
                    <Route path="/login" element={
                        <Login acceptToken={acceptToken} />
                    } />
                    <Route path="/add" element={
                        <TodoAdd />
                    } />
                    <Route path="/register" element={
                        <Register />
                    } />
                    <Route path="/mostactive" element={
                        <MostActiveUsers />
                    } />
                    <Route path="/:id" element={
                        <TodoDetail />
                    } />
                </Routes>
            </TokenContext.Provider>
            <p className="copyright">Все права принадлежат читателю
                                     книги.</p>
        </BrowserRouter>
    );
}

export default App;
