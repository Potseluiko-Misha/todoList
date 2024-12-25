import { useState, useEffect } from 'react';

import { baseURL } from './utility.js';
import TodoItem from './TodoItem.js';
import TodoSearch from './TodoSearch.js';
import TodoSort from './TodoSort.js';

export default function TodoList({ token }) {
    const [todos, setTodos] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('0');

    function acceptSearch(searchWord) {
        setSearch(searchWord);
    }

    function acceptSort(sortOrder) {
        setSort(sortOrder);
    }

    useEffect(() => {
        (async () => {
            const params = new URLSearchParams();
            if (search)
                params.append('search', search);
            params.append('doneAtLast', sort);
            const response = await fetch(`${baseURL}?${params}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok)
                setTodos((await response.json()).todos);
            else
                window.alert(response.status + ': ' +
                             response.statusText);
        })();
    }, [token, search, sort]);

    return (
        <>
            <TodoSearch search={search} acceptSearch={acceptSearch} />
            <TodoSort sort={sort} acceptSort={acceptSort} />
            <h1 className="heading">Запланированные дела</h1>
            {todos.map((item) => (
                <TodoItem key={item._id} item={item} />
            ))}
        </>
    );
}
