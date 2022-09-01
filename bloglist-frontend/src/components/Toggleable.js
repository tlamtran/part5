import { useState, forwardRef, useImperativeHandle } from "react"

const Toggleable = forwardRef((props, refs) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return{
            toggleVisibility
        }
    })

    const showIfTrue = {display: visible ? '' : 'none'}
    const hideIfTrue = {display: visible ? 'none' : ''}

    return(
        <div>
            <button onClick={toggleVisibility} style={hideIfTrue}>
                {props.buttonLabel}
            </button>
            <div style={showIfTrue}>
                {props.children}
            </div>
            <button onClick={toggleVisibility} style={showIfTrue}>
                cancel
            </button>
            
        </div>
    )
})

export default Toggleable