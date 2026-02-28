import { RouterProvider } from "react-router"
import AppRoutes from "./AppRoutes"
import "./style.scss"
import { AuthProvider } from "./features/auth.context"
import { PostContextProvider } from "./features/post/PostContext"
import { UserProvider } from "./features/user.context"
const App = () => {
  return (
    <div>
        <AuthProvider>
          <UserProvider>
            <PostContextProvider>
              <AppRoutes/>
            </PostContextProvider>
          </UserProvider>
        </AuthProvider>
    </div>
  )
}

export default App