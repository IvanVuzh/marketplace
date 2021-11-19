import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../../redux/actions/comment";
import { fetchProduct } from "../../redux/actions/product";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import isPresent from "../helpers/functions/isPresent";

const selectProduct = state => state.product.concreteProduct;
const selectEndedCreation = state => state.comment.endedAction;

const CommentCreation = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [text, setText] = useState("");
    const product = useSelector(selectProduct);
    const endedCreation = useSelector(selectEndedCreation);
    const { productId } = useParams();

    useEffect(() => {
        dispatch(fetchProduct(productId));
    }, [])

    useEffect(() => {
        if ( endedCreation ) {
            history.push('/product/coments/' + productId)
        }
    }, [endedCreation])
    
    const Submit = (e) => {
        e.preventDefault();
        dispatch(createComment({ text: text, productId: productId, authorId: "90c5a9b5-d0c3-44d3-bac4-27dfd8d2e0d5" }))
    }

    const setNewText = (e) => {
        setText(e.target.value);
    }

    return (
        <form onSubmit={Submit}>

            <label>Product name</label>
            <input type="text" className="form-control" id="Name" aria-describedby="nameHelp" placeholder={isPresent(product) ? product.name : "product name"} disabled={true} />
            <label>Comment</label>
            <textarea onChange={setNewText} type="text" className="form-control" id="InputComment" placeholder="Comment" required />
            <button type="submit" className="btn btn-secondary mt-3" disabled={text === ""}>Submit</button>
        </form>
    );

}

export default CommentCreation;