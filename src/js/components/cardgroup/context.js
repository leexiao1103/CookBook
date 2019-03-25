import React from 'react'

const CardGroupContext = React.createContext(null)

const withCardGroup = Component => props => (
    <CardGroupContext.Consumer>
        {value =>
            <Component {...props} {...value} />
        }
    </CardGroupContext.Consumer>
)

export default CardGroupContext

export { withCardGroup }