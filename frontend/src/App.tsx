import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./pages/admin/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route
              index
              element={<Dashboard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;