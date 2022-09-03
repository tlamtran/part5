import PropTypes from 'prop-types'

const Notification = ({ message, style }) => {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const successStyle = {
        color: 'green',
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
            <p style={
                style === 'error'
                    ? errorStyle
                    : successStyle
            }>
                {message}
            </p>
        )
    }
}

Notification.propTypes = {
    style: PropTypes.string.isRequired,
}

export default Notification