import React, { useEffect, useContext } from 'react'
import { useUser } from '../features/user.context'
import { AuthContext } from '../features/auth.context'
import './Sidebar.scss'

const Sidebar = () => {
    const { user } = useContext(AuthContext)
    const { followedUsers, followers, loading, fetchFollowedUsers, fetchFollowers } = useUser()

    useEffect(() => {
        if (user) {
            fetchFollowedUsers()
            fetchFollowers()
        }
    }, [user])

    if (!user) {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                    <p>Please log in</p>
                </div>
            </div>
        )
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>{user?.username}</h3>
                <img src={user?.profileImage} alt="Profile" className="profile-img" />
            </div>

            <div className="sidebar-section">
                <h4>Following ({followedUsers.length})</h4>
                {loading ? (
                    <p>Loading...</p>
                ) : followedUsers.length === 0 ? (
                    <p>No followed users yet</p>
                ) : (
                    <div className="user-list">
                        {followedUsers.map(followedUser => (
                            <div key={followedUser._id} className="user-item">
                                <img src={followedUser.profileImage} alt="" className="user-avatar" />
                                <span>{followedUser.username}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <h4>Followers ({followers.length})</h4>
                {loading ? (
                    <p>Loading...</p>
                ) : followers.length === 0 ? (
                    <p>No followers yet</p>
                ) : (
                    <div className="user-list">
                        {followers.map(follower => (
                            <div key={follower._id} className="user-item">
                                <img src={follower.profileImage} alt="" className="user-avatar" />
                                <span>{follower.username}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="sidebar-section">
                <h4>Menu</h4>
                <ul className="menu-list">
                    <li>Profile</li>
                    <li>Settings</li>
                    <li>Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar