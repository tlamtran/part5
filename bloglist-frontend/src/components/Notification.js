const Notification = ({message}) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }
    else {
        return(
            <p style={errorStyle}>{message}</p>
        )
    }
}

export default Notification