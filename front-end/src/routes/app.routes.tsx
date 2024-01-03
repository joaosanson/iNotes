import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "../pages/SignIn";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  )
}