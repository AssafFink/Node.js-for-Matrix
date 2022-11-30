import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModel from "../../../Models/ProductModel";
import { authStore } from "../../../Redux/AuthState";
import notifyService from "../../../Services/NotifyService";
import productsService from "../../../Services/ProductsService";
import "./ProductList.css";

function ProductList(): JSX.Element {

    const [products, setProducts] = useState<ProductModel[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        if (!authStore.getState().token) {
            notifyService.error("You must logged in");
            navigate("/login");
            return;
        }

        productsService.getAllProducts()
            .then(products => setProducts(products))
            .catch(err => notifyService.error(err));
            
    }, []);

    return (
        <div className="ProductList">

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p =>
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>${p.price}</td>
                            <td>{p.stock}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default ProductList;
