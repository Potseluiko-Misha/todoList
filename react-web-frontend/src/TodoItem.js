export default function TodoItem({ item }) {
    return (
        <article className="card">
            <header>
                {item.done &&
                    <h2><del><a href="/">
                                {item.title}</a></del></h2>
                }
                {!item.done &&
                    <h2><a href="/">{item.title}</a></h2>
                }
            </header>
            <footer>
                {item.desc && <p>{item.desc}</p>}
                <p className="datetime">
                   {new Date(item.createdAt).toLocaleString()}</p>
            </footer>
        </article>
    );
}
