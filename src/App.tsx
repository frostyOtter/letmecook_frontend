import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import SearchPage from "@/pages/search";
import PremiumPage from "@/pages/premium";
import SharePage from "@/pages/sharing";
import AboutPage from "@/pages/about";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SearchPage />} path="/search" />
      <Route element={<PremiumPage />} path="/premium" />
      <Route element={<SharePage />} path="/sharing" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
