import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import product from "./product";
import category from "./category";
import comment from "./comment";

export default combineReducers({
  comment,
  auth,
  category,
  message,
  user,
  product,
});
