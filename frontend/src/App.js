// Cadmium Green	#097969 +
// Blue Green	#088F8F
// Lincoln Green	#478778
// Celadon	#AFE1AF   +

import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUP from "./Components/SignUP";
import LoginPage from "./Components/LoginPage";
import Feed from "./Components/Feed";
import EditProfile from "./Components/EditProfile";
import { useState } from "react";
// import Header from "./Components/Header";
// import AddPost from "./Components/AddPost";

function App() {
  const [tokenApp, setTokenApp] = useState("");

  const tokenhandler = (id) => {
    console.log(id);
    setTokenApp(id);
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<Navigate to="/sign-up" />} /> */}
          <Route path="/sign-up" element={<SignUP />} />

          <Route
            path="/login"
            element={<LoginPage tokenhandler={tokenhandler} />}
          />
          <Route path="/" element={<Feed tokenApp={tokenApp} />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
