import Hero from "../components/Hero"
import Welcome from "../components/Welcome"
import Kepsek from "../components/Kepsek"
import Jurusan from "../components/Jurusan"
import Prestasi from "../components/Prestasi"
import Artikel from "../components/Artikel"

function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <Kepsek />
      <Artikel />
      <Jurusan />
      <Prestasi />
    </>
  )
}

export default Home