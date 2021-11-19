import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/product";
import { fetchPaginatedCategories } from "../../redux/actions/category";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const selectCategories = state => state.category.data;
const selectEndedCreation = state => state.category.endedAction;

const ProductCreation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState();
    const [price, setPrice] = useState(-1);
    const [categoryId, setCategory] = useState();
    const [sellerId, setSeller] = useState();
    const categories = useSelector(selectCategories);
    const endedCreation = useSelector(selectEndedCreation);

    useEffect(() => {
        dispatch(fetchPaginatedCategories());
    }, [])

    useEffect(() => {
        if ( endedCreation ) {
            history.push('/categories')
        }
    }, [endedCreation])

    const Submit = () => {
        dispatch(createProduct({ name, price, categoryId, sellerId }))
    }

    const setNewPrice = (e) => {
        const input = e.target.value;
        if (parseFloat(input) > 0)
            setPrice(parseFloat(input));
        else {
            setPrice(-1);
        }
    }

    const setNewName = (e) => {
        setName(e.target.value);
    }

    const setNewCategory = (e) => {
        setCategory(e.target.value);
    }

    const setNewSeller = (e) => {
        setSeller(e.target.value)
    }

    return (
        <form onSubmit={() => Submit()}>
            <div className="row">
                <div className="col">
                    <label>Product name</label>
                    <input onChange={setNewName} type="text" className="form-control" id="InputName" aria-describedby="nameHelp" placeholder="Product name" required />
                </div>
                <div className="col">
                    <label>Price</label>
                    <input onChange={setNewPrice} type="double" className="form-control" id="exampleInputPassword1" placeholder="Price" required />
                </div>
                <div className="row">
                    <div className="col">
                        <label>Example select</label>
                        <select className="form-control"
                            id="CategorySelect"
                            onChange={setNewCategory}
                            required >
                            {categories.map(category =>
                                <option value={category.id}>{category.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col">
                        <label>Seller ID</label>
                        <input onChange={setNewSeller} type="text" className="form-control" id="InputSeller" aria-describedby="sellerHelp" placeholder="Enter seller ID" required />
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={price === -1}>Submit</button>
        </form>
    );

}

export default ProductCreation;