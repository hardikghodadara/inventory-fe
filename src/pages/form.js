import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/home";
import Dashboard from "../components/dashboard";
import About from "../components/about";
import AddItem from "../components/AddItem";
// import NavBar from "../components/navBar";


export default function form() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddItem />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
