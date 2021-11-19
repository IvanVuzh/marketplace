import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchCategory } from "../../redux/actions/category";

const selectCategory = state => state.category.concreteCategory;

const CategoryDetailed = () => {
    const category = useSelector(selectCategory);
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchCategory(id))
    }, [])

    return (
        <>
            {category && <div className="Container justify-content-center ">
                <div className="h2 text-center">
                    {category.name}
                </div>
                <ul className="">
                    <li className="h5">
                        <div className="row">
                            <div className="col-2">ID:</div>
                            <div className="col">{category.id}</div>
                        </div>
                    </li>
                    <li className="h5">
                        <div className="row">
                            <div className="col-2">Subscription price:</div>
                            <div className="col">{category.subscriptionPrice}</div>
                        </div>
                    </li>
                </ul>
            </div>}
        </>
    );
}

export default CategoryDetailed;