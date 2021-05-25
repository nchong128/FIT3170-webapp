import {useState} from "react"
import {useHistory} from 'react-router-dom'
import {useAuth} from "../../../contexts/AuthContext"


export const Login = () => {
    const {login} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()


    async function loginEmailPassword() {
        const cleanUp = () => {setLoading(false)}

        try {
            setError('')
            setLoading(true)
            await login("lasithvindu1@gmail.com", "123456")
        } catch(e) {
            console.log(e)
            setError('Failed to login. Check if used correct credentials')
            return cleanUp()
        }

        let res = cleanUp()
        history.push('/')
        return res
    }

    return (
        <button onClick={loginEmailPassword}>
        </button>
    )
}
