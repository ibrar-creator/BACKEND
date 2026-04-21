import { useContext, useEffect } from "react"
import { registerUser, loginUser, getMe, logoutUser } from "../services/auth.api"
import { AuthContext } from "../auth.context"

export const useAuth = () => {
    const {user, setUser, loading, setLoading} = useContext(AuthContext)

async function handleRegister(username, email, password){
    try {
        setLoading(true)
        const data = await registerUser(username, email, password)
        setUser(data.user)
        return true
    } catch (err) {
        console.error('register error', err?.message || err)
        return false
    } finally {
        setLoading(false)
    }
}

async function handleLogin(email, password){
    try {
        setLoading(true)
        const data = await loginUser(email, password)
        setUser(data.user)
        return true
    } catch (err) {
        console.error('login error', err?.response?.data || err?.message || err)
        return false
    } finally {
        setLoading(false)
    }
}

async function handleGetMe(){
    try {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
    } catch (err) {
        if (err?.response?.status !== 401) console.error('getMe error', err)
        setUser(null)
    } finally {
        setLoading(false)
    }
}

async function handleLogout(){
    try {
        setLoading(true)
        await logoutUser()
        setUser(null)
    } catch (err) {
        console.error('logout error', err)
    } finally {
        setLoading(false)
    }
}
  useEffect(() => {
        handleGetMe()
    }, [])

    return ({
        user, loading, handleRegister, handleLogin, handleLogout, handleGetMe
    })
}

