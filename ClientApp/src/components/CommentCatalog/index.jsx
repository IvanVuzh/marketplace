import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import CreateButton from '../helpers/Buttons/CreateButton'
import { fetchPaginatedComments, deleteComment } from '../../redux/actions/comment';
import { commentsLimit } from '../../redux/helpers/constants';
import { useParams } from 'react-router';
import { fetchProduct } from '../../redux/actions/product';
import isPresent from '../helpers/functions/isPresent';
import Comment from '../helpers/Comment';

const selectComments = state => state.comment.data;
const shouldFetch = state => state.comment.shouldFetch;
const selectOffset = state => state.comment.offset;
const selectCommentsCount = state => state.comment.commentsCount;
const selectProduct = state => state.product.concreteProduct;

const CommentCatalog = () => {
    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const fetch = useSelector(shouldFetch);
    const offset = useSelector(selectOffset);
    const commentsCount = useSelector(selectCommentsCount);
    const product = useSelector(selectProduct);
    const { productId } = useParams();

    const tableHeaders = [
        { text: 'ID', dataProp: 'id' },
        { text: 'Text', dataProp: 'text' },
        { text: 'Author', dataProp: 'author' },
    ];

    useEffect(() => {
        dispatch(fetchPaginatedComments(offset, productId));
        dispatch(fetchProduct(productId));
    }, []);

    useEffect(() => {
        if (fetch)
            dispatch(fetchPaginatedComments(offset, productId));
    }, [fetch]);

    const fetchComments = (offset) => {
        dispatch(fetchPaginatedComments(offset, productId));
    }

    const commentsToDisplay = comments ? comments.map(comment => ({
        ...comment,
        author: comment.author.displayName,
    })) : []

    const titleEnding = isPresent(product) && product.name;

    const start = commentsLimit * offset;
    const end = commentsLimit * (offset + 1) < commentsCount ? commentsLimit * (offset + 1) : commentsCount;
    return (
        <div className="container-fluid bg-white rounded mb-5">
            <div className="row pt-4 pb-4">
                <div className="col-6 ps-5">
                    <div className="fs-3 fw-bold h2">{'Comments for ' + titleEnding} </div>
                </div>
                <div className="col-6 d-flex flex-row-reverse">
                    <CreateButton link={`/create-comment/${productId}`} text="Write new comment" />
                </div>
            </div>
            <div className="row">
                {
                    commentsToDisplay.map(entry =>
                        <Comment headers={tableHeaders} comment={entry} key={"comment " + entry.id} />
                    )
                }
            </div>
            {commentsToDisplay.length === 0 &&
                <div className="row text-center p-3">
                    <div className="col-12">
                        <p className="text-muted">There is no items added to the catalog</p>
                    </div>
                </div>
            }
            {commentsToDisplay.length !== 0 &&
                <>
                    <button type="button" className="btn naviBtn" disabled={start === 0}
                        onClick={() => fetchComments(0)}>|&#60;</button>
                    <button type="button" className="btn naviBtn" disabled={start === 0}
                        onClick={() => fetchComments(offset - 1)}>&#60;</button>
                    {start + 1} - {end} of {commentsCount}
                    <button type="button" className="btn naviBtn" disabled={end >= commentsCount}
                        onClick={() => fetchComments(offset + 1)}>&#62;</button>
                    <button type="button" className="btn naviBtn" disabled={end >= commentsCount}
                        onClick={() => fetchComments(Math.floor(commentsCount / commentsLimit))}>&#62;|
                    </button>
                </>
            }
        </div>
    )
}

export default CommentCatalog;