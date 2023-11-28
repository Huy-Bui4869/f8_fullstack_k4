import { Routes, Route, Navigate } from "react-router-dom";

import DefaultLayout from "../Layout/DefaultLayout/DefaultLayout";

import Product from "../pages/Product/Product";
import ProductDetail from "../pages/Product/ProductDetail";
import Cart from "../pages/Card/Cart";

export const publicRoutes = (
  <>
    <Route element={<DefaultLayout />}>
      <Route path="/">
        <Route path="" element={<Product />} />
        <Route path=":path" element={<ProductDetail />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
    </Route>
  </>
);

// {/* <>
//   <Routes>
//     <Route index element={<Navigate to="/product" />}>
//       {/* <Route path="" element={<Product />} /> */}
//       <Route path=":path" element={<ProductDetail />} />
//     </Route>
//     <Route path="/cart" element={<Cart />} />
//   </Routes>
// </>; */}
