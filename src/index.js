import React from 'react'
import ReactDOM from 'react-dom'
import App from './js/app'
import './css/main.css'
import Firebase, { FirebaseContext } from './js/components/firebase'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root')
)
