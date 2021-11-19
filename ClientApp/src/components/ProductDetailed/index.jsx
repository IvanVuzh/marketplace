import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchProduct } from "../../redux/actions/product";
import { Link } from "react-router-dom";

import "./styles.css"

const selectProduct = state => state.product.concreteProduct;

const ProductDetailed = () => {
    const product = useSelector(selectProduct);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchProduct(id))
    }, [])

    return (
        <>
            {product && <div className="Container justify-content-center mt-5">
                <div className="h2 text-center row mb-3">
                    <div className="col-10">
                        {product.name}
                    </div>
                    <div className="col-2">
                        <Link to={"/product/comments/" + id} style={{ textDecoration: 'none' }}>
                            <button className="btn btn-outline-dark btn-sm">Comments</button>
                        </Link>
                    </div>
                </div>
                <ul className="">
                    <li className="h5 mb-2">
                        <div className="row">
                            <div className="col-2">ID:</div>
                            <div className="col">{product.id}</div>
                        </div>
                    </li>
                    <li className="h5 mb-2">
                        <div className="row">
                            <div className="col-2">Category:</div>
                            <div className="col">{product.category.name}</div>
                        </div>
                    </li>
                    <li className="h5 mb-2">
                        <div className="row">
                            <div className="col-2">Seller:</div>
                            <div className="col">{product.seller.displayName}</div>
                        </div>
                    </li>
                </ul>
                <div className="h3 row">
                    <div className="col-2">Price:</div>
                    <div className="col">{product.price}$</div>
                </div>
            </div>}
        </>
    );

}

export default ProductDetailed;