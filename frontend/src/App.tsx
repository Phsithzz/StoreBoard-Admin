

import { BrowserRouter, Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (

  <BrowserRouter>
  <div className="min-h-screen bg-base-200 "
>

  <Navbar/>
  <Routes>

    <Route path="/" element={<HomePage/>}/>
    <Route path="/product/:id" element={<ProductPage/>}/>
    
  </Routes>
    <Toaster
     position="top-right"
  reverseOrder={false}
    />
</div>

  </BrowserRouter>

  )
}

export default App