import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchUser, ApplyMyRate } from "../../redux/actions/user";
import StarRating from "../helpers/StarRating";
import { userRoles } from "../helpers/Enums/roles";

import "./styles.css"

const selectUser = state => state.user.concreteUser;

const UserDetailed = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    dispatch(fetchUser(id))
  }, [])

  const RateUser = () => {
    dispatch(ApplyMyRate(id, rating));
  }

  return (
    <>
      {user && <div className="Container justify-content-center ">
        <div className="h2 text-center">
          {user.displayName}
        </div>
        <ul className="">
          <li className="h5">
            <div className="row">
              <div className="col-2">ID:</div>
              <div className="col">{user.id}</div>
            </div>
          </li>
          
          <li className="h5">
            <div className="row">
              <div className="col-2">Role:</div>
              <div className="col">{userRoles[user.role]}</div>
            </div>
          </li>
          <li className="h5">
            <div className="row">
              <div className="col-2">E-mail:</div>
              <div className="col">{user.email}</div>
            </div>
          </li>
          <li className="h5">
            <div className="row">
              <div className="col-1">
                Rating:
              </div>
              <StarRating rating={user.rating}/>
            </div>
          </li>
        </ul>


        <div className="li mt-5 h6 row">
          <div className="col-2">
            Rate this user:
          </div>
          <StarRating rating={rating} setRating={setRating} isActive={true} />
          <button className="col-2"
          onClick={() => RateUser()}>Confirm</button>
        </div>

      </div>}
    </>
  );

}

export default UserDetailed;