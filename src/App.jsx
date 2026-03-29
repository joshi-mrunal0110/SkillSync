import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentInfo from "./pages/StudentInfo";
import Dashboard from "./pages/Dashboard";
import SkillSelect from "./pages/SkillSelect";
import AcquireSkills from "./pages/AcquireSkills";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/student-info" element={<StudentInfo />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/acquire-skills" element={<AcquireSkills />} />
      <Route path="/select-skills" element={<SkillSelect />} />
    
    </Routes>
  );
}

export default App;
