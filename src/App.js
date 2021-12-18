import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import SignIn from "./components/Form/SignIn";
import SignUp from "./components/Form/SignUp";
import Post from "./components/Post/Post";
import SearchList from "./components/List/SearchList";
import Detail from "./components/Detail/Detail";
import FavoriteList from "./components/List/FavoriteList";
import SignOut from "./components/SignOut/SignOut";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signOut" element={<SignOut />} />
        <Route path="/post" element={<Post />} />
        <Route path="/search" element={<SearchList />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route exact path="/jobDetail/:jobId" element={<Detail />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
