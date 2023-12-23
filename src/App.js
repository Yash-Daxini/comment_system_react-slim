import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Layout from "./components/Layout";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
