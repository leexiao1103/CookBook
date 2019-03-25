import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

//正式站
const proconfig = {
    apiKey: "AIzaSyAXTQNYW2XTtgsg-tEHi_6UBc3szssqJ0c",
    authDomain: "cookbook-6c67d.firebaseapp.com",
    databaseURL: "https://cookbook-6c67d.firebaseio.com",
    projectId: "cookbook-6c67d",
    storageBucket: "cookbook-6c67d.appspot.com",
    messagingSenderId: "855049344402"
}
//測試站
const devconfig = {
    apiKey: "AIzaSyBphJkcqS8IX5nDmEjoCiNiNt-EYfkoj5o",
    authDomain: "cookbooktest-4fea9.firebaseapp.com",
    databaseURL: "https://cookbooktest-4fea9.firebaseio.com",
    projectId: "cookbooktest-4fea9",
    storageBucket: "cookbooktest-4fea9.appspot.com",
    messagingSenderId: "1003067516877"
}
const config = devconfig//process.env.NODE_ENV === 'production' ? proconfig : devconfig

export default class Firebase {
    constructor() {
        console.log('constructor firebase')
        firebase.initializeApp(config)
        this.auth = firebase.auth()
        this.db = firebase.database()
        this.storage = firebase.storage()
    }

    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password)

    doSignOut = () => this.auth.signOut()

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

    getCurrentUser = () => this.auth.currentUser

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`)

    users = () => this.db.ref('users')

    pushToDB = (url, data) => this.db.ref(url).push(data)

    removeData = url => this.db.ref(url).remove()

    getDefaultImg = () => {
        this.storage.ref().child('image.png').getDownloadURL()
            .then(url => {
                return url
            }).catch(function (error) {
                // Handle any errors
                switch (error.code) {
                    case 'storage/object_not_found':
                        console.log(`File doesn't exist`)
                        break;

                    case 'storage/unauthorized':
                        console.log(`User doesn't have permission to access the object`);
                        break;

                    case 'storage/canceled':
                        console.log(`User canceled the upload`);
                        break;

                    case 'storage/unknown':
                        console.log(`Unknown error occurred, inspect the server response`);
                        break;
                }
                return ''
            })
    }
}
