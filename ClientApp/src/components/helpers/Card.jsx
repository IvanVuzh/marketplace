import React from "react";
import { useHistory } from 'react-router';
import isPresent from "./functions/isPresent";

const Card = ({
    headers = [],
    data = [],
    detailUrl,
}) => {
    const history = useHistory();
    return (
        <div className="col-4" style={ {"cursor": isPresent(detailUrl) ? "pointer" : "default"}}
            onClick={() => detailUrl != null ? history.push(`${detailUrl}/${data.id}`) : null} 
            id={"card wrapper" + Math.random()}>
            <div className="container rounded border border-secondary border-1 mb-4" id={"card container" + Math.random()}>
                {
                    headers.map(e => (
                        <div className="row" id={"card prop wrapper" + Math.random()} key={"card prop wrapper" + Math.random()}>
                            <div className="h5 col" key={e.text + Math.random()} style={{ "width": 1 / headers.length }} id={"card prop name" + Math.random()}>
                                {e.text}
                            </div>
                            <div 
                            className="col ms-1 mb-1"
                            key={e.text + Math.random()} 
                            style={{ "width": 1 / headers.length }} 
                            id={"card prop data" + Math.random()}
                            style={{"wordWrap": "break-word"}}
                            >
                                {data[e.dataProp]} {e.dataProp === "price" && "$"}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Card;