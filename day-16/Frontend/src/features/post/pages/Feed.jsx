import React from 'react'
import "./feed.scss"
import Post from '../components/Post'
import { usePost} from '../hook/usePost'
import { useEffect } from "react"
import Nav from '../style/Components/Nav'
const Feed = () => {
  const {loading, feed, handGetFeed, handleToggleLike, handleToggleFollow} = usePost()
  useEffect(()=>{
    handGetFeed()
  },[])
  if(loading|| !feed) 
    return <main><p>Loading...</p></main>
    console.log(feed);
    
  return (
    <main className="feed-page">
      <Nav/>
      <div className="feed">
        <div className="posts">
         {feed.map(post=>{
          return <Post user={post.user} post={post} onToggleLike={handleToggleLike} onToggleFollow={handleToggleFollow}/>

         })}
          
        </div>
      </div>
    </main>
  )
}

export default Feed