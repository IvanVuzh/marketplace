import React from "react";
import { Link } from "react-router-dom"; 

const CreateButton = ({ link=null, text=null }) => {
    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline-dark">{text}</button>
        </Link>
    );
};

export default CreateButton;
