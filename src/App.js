/** @format */

import { Route, Routes } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import CardPage from "./pages/CardPage";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/shop' element={<ShopPage />}></Route>
          <Route path='/card' element={<CardPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;