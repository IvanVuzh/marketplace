import React from "react"
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_MESSAGE } from "../../redux/actions/types";

const selectError = state => state.message.message;

const ErrorHandler = () => {
    const error = useSelector(selectError);
    const dispatch = useDispatch();

    return (
        <>
            {error !== null &&
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Error</strong> {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={() => dispatch({type: CLEAR_MESSAGE})}aria-label="Close"></button>
                </div>
            }
        </>
    )
}

export default ErrorHandler;