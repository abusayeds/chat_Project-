// App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import ChatApp from "./components/UserVisite";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ChatApp />} />
      </Routes>
    </Router>
  );
};

export default App;
