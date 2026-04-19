import { BrowserRouter, Routes, Route } from "react-router-dom";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
};