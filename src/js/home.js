import React from 'react'
import CardGroup from './components/cardgroup/cardgroup'
import { withAuthorization } from './components/auth'

const Home = () => (<CardGroup />)

export default withAuthorization(auth => !!auth)(Home)