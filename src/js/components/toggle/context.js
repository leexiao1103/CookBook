import React from 'react'

const ToggleContext = React.createContext(null)

const withToggle = Component => props => (
    <ToggleContext.Consumer>
        {value =>
            <Component {...props} {...value} />
        }
    </ToggleContext.Consumer>
)

export default ToggleContext

export { withToggle }