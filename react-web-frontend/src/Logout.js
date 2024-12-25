export default function Logout({ acceptToken }) {
    function handleFormSubmit(evt) {
        evt.preventDefault();
        acceptToken(undefined);
    }

    return (
        <form className="horizontal" onSubmit={handleFormSubmit}>
            <input type="submit" className="warning" value="Выйти" />
        </form>
    );
}
