import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminLayout from "./pages/admin/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import Login from "./pages/admin/Login"
import Berita from "./pages/admin/Berita"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />

          {/* Admin Login (tidak pakai AdminLayout agar tidak redirect loop) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={<AdminLayout />}
          >
            <Route index element={<Dashboard />} />
            <Route path="berita" element={<Berita />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;