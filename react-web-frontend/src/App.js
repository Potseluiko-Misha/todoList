import { useState } from 'react';

import TodoList from './TodoList.js';
import Login from './Login.js';
import Logout from './Logout.js';

function App() {
    const [token, setToken] = useState(undefined);

    function acceptToken(tkn) {
        setToken(tkn);
    }

    return (
        <>
            <nav>
                {token &&
                    <a href="/" className="brand">
                        <span>Список дел</span>
                    </a>
                }
                <input id="bmenub"
                      type="checkbox" className="show" />
                <label htmlFor="bmenub"
                      className="burger pseudo button">&#9776;</label>
                <div className="menu">
                    {token && <Logout acceptToken={acceptToken} />}
                </div>
            </nav>
            {!token && <Login acceptToken={acceptToken} />}
            {token && <TodoList token={token} />}
            <p className="copyright">Все права принадлежат читателю
                                     книги.</p>
        </>
    );
}

export default App;
