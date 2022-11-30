import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import Forum from "../../ForumArea/Forum/Forum";
import Home from "../../HomeArea/Home/Home";
import ProductList from "../../ProductsArea/ProductList/ProductList";
import EditUser from "../../AuthArea/EditUser/EditUser";
import PageNotFound from "../PageNotFound/PageNotFound";

function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/profile/edit/:id" element={<EditUser />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default Routing;
