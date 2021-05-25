import {useContext, createContext, useState, useEffect} from 'react'
import {auth} from '../firebase'

const AuthContext = createContext(null)

export function useAuth() {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    } 

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    } 

    function logout() {
        return auth.signOut()
    }

    function updateDisplayName(displayName) {
        return currentUser.updateProfile({displayName})
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function sendPasswordResetEmail(email) {
        return auth.sendPasswordResetEmail(email)
    }
 
    const value = {
        currentUser,
        signUp,
        login,
        logout,
        updateDisplayName,
        updatePassword,
        sendPasswordResetEmail
    }

    useEffect(()=>{
        // Callback that will automatically setUser when user state changes (use Logs In)
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            // Firebase will automatically search through 
            // localStorage to see if you have the right tokens
            // to automatically login.
            // Do not render sign up form while this async process is occuring
            setLoading(false)   
        })

        return unsubscribe  // auth.onAuthStateChanged(...) returns an unsubscribe method
    },[])
    return (
        <AuthContext.Provider  value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
