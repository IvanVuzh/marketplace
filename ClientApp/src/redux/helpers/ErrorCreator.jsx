import { SET_MESSAGE, CLEAR_MESSAGE } from "../actions/types";
import isPresent from "../../components/helpers/functions/isPresent";

const ErrorCreator = (error) => async (dispatch) => {
    let message = "unknown error occured";
    if (isPresent(error.response) && error.response.status === 422) {
        message = "Not all data entered or invalid data entered. Check ";
        error.response.data.detail.forEach(element => {
            message += element.loc[1] + " & ";
        });
        message = message.slice(0, -2)
        if (message.includes("to_destination")) {
            message = error.response.data.detail[0].msg;
        }
    }
    else if (isPresent(error.response) && error.response.status === 403) {
        message = "You are not allowed to perform this action.";
    }
    else if (isPresent(error.response) && (error.response.status === 400 || error.response.status === 401)) {
        message = error.response.data.detail;
    }
    else if (isPresent(error) && error.status === 500) {
        message = "Server error.";
    }
    if (isPresent(error.message)) {
        message = error.message;
    }
    await dispatch({
        type: SET_MESSAGE,
        payload: message
    });

    setTimeout(() => dispatch({type: CLEAR_MESSAGE}), 10000);
}

export default ErrorCreator;