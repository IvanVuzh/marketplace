import React from "react";
import { useHistory } from 'react-router';

const Card = ({
    headers = [],
    data = [],
    detailUrl,
}) => {
    const history = useHistory();
    return (
        <div className="col-4" style={ {"cursor": "pointer"} }
            onClick={() => detailUrl != null ? history.push(`${detailUrl}/${data.id}`) : null}>
            <div class="container rounded border border-secondary border-1 mb-4">
                {
                    headers.map(e => (
                        <div className="row">
                            <div className="h5 col" key={e.text + Math.random()} style={{ "width": 1 / headers.length }}>
                                {e.text}
                            </div>
                            <div className="col mb-1" key={e.text + Math.random()} style={{ "width": 1 / headers.length }}>
                                {data[e.dataProp]} {e.dataProp == "price" && "$"}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Card;