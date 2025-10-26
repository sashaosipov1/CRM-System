import TodoPage from "./pages/TodoPage"
import AccountPage from "./pages/AccountPage"
import NavigationMenu from "./components/NavigationMenu"
import './styles/main.css'
import { Routes, Route } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <>
      <NavigationMenu>
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/profile" element={<AccountPage />} />
          {/* Catch-all route for 404 pages */}
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </NavigationMenu>

    </>
  )
}

export default App