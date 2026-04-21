
// import FaceExpression from './Features/components/FaceExpression'

import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import "./Features/shared/style/global.scss"
import { AuthProvider } from "./Features/auth/auth.context"

function App() {


  return (
 <>
<AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
 {/* <FaceExpression /> */}
 </>
  )
}

export default App
