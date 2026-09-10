import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import DetailBerita from "./pages/DetailBerita"
import DetailPrestasi from "./pages/DetailPrestasi"
import Alumni from "./pages/Alumni"
import Footer from "./components/Footer"
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "./pages/admin/AdminLayout"
import Dashboard from "./pages/admin/Dashboard"
import Login from "./pages/admin/Login"
import Berita from "./pages/admin/Berita"
import AdminJurusan from "./pages/admin/Jurusan"
import AdminPrestasi from "./pages/admin/Prestasi"
import AdminGuru from "./pages/admin/Guru"
import AdminSiswa from "./pages/admin/Siswa"
import AdminAlumni from "./pages/admin/Alumni"
import ChatBot from "./components/ChatBot"
import ChatBotPage from "./pages/ChatBotPage"

function App() {
  return (
      <>
          <BrowserRouter>
              <Routes>
                  {/* Public Routes */}
                  <Route
                      path='/'
                      element={
                          <>
                              <Navbar />
                              <Home />
                              <ChatBot />
                              <Footer />
                          </>
                      }
                  />
                  <Route
                      path='/beranda'
                      element={
                          <>
                              <Navbar />
                              <Home />
                              <ChatBot />
                              <Footer />
                          </>
                      }
                  />
                  <Route
                      path='/alumni'
                      element={
                          <>
                              <Navbar />
                              <Alumni />
                              <Footer />
                          </>
                      }
                  />
                  <Route
                      path='/berita/:id'
                      element={
                          <>
                              <Navbar />
                              <DetailBerita />
                              <Footer />
                          </>
                      }
                  />
                  <Route
                      path='/prestasi/:id'
                      element={
                          <>
                              <Navbar />
                              <DetailPrestasi />
                              <Footer />
                          </>
                      }
                  />
                   <Route path='/chatbot' element={<ChatBotPage />} />

                  {/* Admin Login */}
                  <Route path='/admin/login' element={<Login />} />

                  {/* Admin Protected Routes */}
                  <Route path='/admin' element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path='berita' element={<Berita />} />
                      <Route path='jurusan' element={<AdminJurusan />} />
                      <Route path='prestasi' element={<AdminPrestasi />} />
                      <Route path='guru' element={<AdminGuru />} />
                      <Route path='siswa' element={<AdminSiswa />} />
                      <Route path='alumni' element={<AdminAlumni />} />
                  </Route>

                  {/* Catch all fallback to / */}
                  <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;