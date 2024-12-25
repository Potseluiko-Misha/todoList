import { useState } from 'react';

export default function TodoSearch({ search, acceptSearch }) {
    const [s, setS] = useState(search);

    function handleFormSubmit(evt) {
        evt.preventDefault();
        acceptSearch(s);
    }

    return (
        <form className="horizontal" onClick={handleFormSubmit}>
            <input name="search" value={s}
               onChange={(evt) => {setS(evt.target.value)}} />
            <input type="submit" value="Найти" />
        </form>
    );
}
