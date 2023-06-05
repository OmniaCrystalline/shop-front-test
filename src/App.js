/** @format */

import { Route, Routes } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import CardPage from "./pages/CardPage";
import Layout from "./components/Layout";
import HistoryPage from "./pages/HistoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ShopPage />}></Route>
          <Route path='/card' element={<CardPage />}></Route>
          <Route path='/history' element={<HistoryPage/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
