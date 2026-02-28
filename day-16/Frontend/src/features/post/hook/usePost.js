import {getFeed, createPost, toggleLike} from "../services/post.api"
import { toggleFollow } from "../../services/user.api"
import { useContext } from "react"
import { UserContext } from "../../user.context"
import { PostContext } from "../PostContext"
export  const usePost = () => {
    const context = useContext(PostContext)
    const { refreshUserData } = useContext(UserContext)
    const {loading, setLoading, posts, setPosts, feed, setFeed} = context
    const handGetFeed = async() => {
        setLoading(true)
        const date = await getFeed()
        setFeed(date.posts)
        setLoading(false)
    }

    const handleCreatePost = async (file, caption) => {
        setLoading(true)
        try {
            const newPost = await createPost(file, caption)
            // Optionally add to posts or refresh feed
            setPosts(prev => [newPost, ...prev])
            setLoading(false)
            return newPost
        } catch (error) {
            setLoading(false)
            throw error
        }
    }

    const handleToggleLike = async (postId) => {
        try {
            const result = await toggleLike(postId)
            // Update the feed or posts state to reflect the like change
            setFeed(prevFeed => prevFeed.map(post => 
                post._id === postId ? { ...post, isLiked: result.liked } : post
            ))
            setPosts(prevPosts => prevPosts.map(post => 
                post._id === postId ? { ...post, isLiked: result.liked } : post
            ))
        } catch (error) {
            console.error("Error toggling like:", error)
        }
    }

    const handleToggleFollow = async (username) => {
        try {
            const result = await toggleFollow(username)
            // Update the feed to reflect the follow change
            setFeed(prevFeed => prevFeed.map(post => 
                post.user.username === username ? { ...post, user: { ...post.user, isFollowing: result.following } } : post
            ))
            setPosts(prevPosts => prevPosts.map(post => 
                post.user.username === username ? { ...post, user: { ...post.user, isFollowing: result.following } } : post
            ))
            // Refresh sidebar data
            refreshUserData()
        } catch (error) {
            console.error("Error toggling follow:", error)
        }
    }

 return {loading, posts,  feed,  handGetFeed, handleCreatePost, handleToggleLike, handleToggleFollow}
}
