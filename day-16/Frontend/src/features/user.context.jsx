import React, { createContext, useState, useContext, useEffect } from 'react'
import { AuthContext } from './auth.context'
import { getFollowedUsers, getFollowers } from './services/user.api'

export const UserContext = createContext()

export function UserProvider({ children }) {
    const { user } = useContext(AuthContext)
    const [followedUsers, setFollowedUsers] = useState([])
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchFollowedUsers = async () => {
        if (!user) return
        setLoading(true)
        try {
            const data = await getFollowedUsers()
            setFollowedUsers(data.followed)
        } catch (error) {
            console.error("Error fetching followed users:", error)
        } finally {
            setLoading(false)
        }
    }

    const fetchFollowers = async () => {
        if (!user) return
        setLoading(true)
        try {
            const data = await getFollowers()
            setFollowers(data.followers)
        } catch (error) {
            console.error("Error fetching followers:", error)
        } finally {
            setLoading(false)
        }
    }

    const refreshUserData = () => {
        fetchFollowedUsers()
        fetchFollowers()
    }

    useEffect(() => {
        if (user) {
            fetchFollowedUsers()
            fetchFollowers()
        }
    }, [user])

    return (
        <UserContext.Provider value={{
            followedUsers,
            followers,
            loading,
            fetchFollowedUsers,
            fetchFollowers,
            refreshUserData
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)