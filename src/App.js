import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Layout from "./components/Layout";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import SignUp from "./components/SignUp";
import AddPost from "./components/AddPost";
import EditComment from "./components/EditComment";

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
            <Route path="/addPost" element={<AddPost />}></Route>
            <Route path="/editcomment/:id" element={<EditComment />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
