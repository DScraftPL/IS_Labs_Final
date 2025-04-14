const reloadButton = () => {
    const handleClick = () => {
        fetch('http://localhost:3000/csv/who')
        fetch('http://localhost:3000/csv/transport')
        console.log('Reloading DB...')
    }

    return (<>
        <button onClick={handleClick}>Reload DB</button>
    </>)
}

export default reloadButton