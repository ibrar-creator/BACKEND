import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/post/pages/feed'
import CreatePost from './features/post/pages/CreatePost'
import Layout from './components/Layout'

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/' element={
                    <Layout>
                        <Feed />
                    </Layout>
                } />
                <Route path='/create-post' element={
                    <Layout>
                        <CreatePost />
                    </Layout>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes