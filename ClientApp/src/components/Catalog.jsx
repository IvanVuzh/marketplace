import React from 'react';
import "./Catalog.css";
import Card from './helpers/Card';
export const Catalog = ({
  detailUrl = null,
  title = '',
  actionComponent = null,
  headers = [],
  data = [],
  fetchData,
  offset,
  limit,
  elementsCount = 0,
}) => {
  const start = limit * offset;
  const end = limit * (offset + 1) < elementsCount ? limit * (offset + 1) : elementsCount;
  return (
    <div className="container-fluid bg-white rounded mb-5">
      <div className="row pt-4 pb-4">
        <div className="col-6 ps-5">
          <div className="fs-3 fw-bold h2">{title} </div>
        </div>
        <div className="col-6 d-flex flex-row-reverse">
          {actionComponent}
        </div>
      </div>
        <div className="row">
          {
            data.map(entry => 
              <Card headers={headers} data={entry} detailUrl={detailUrl} key={"card " + Math.random()}/>
            )
          }
        </div>
        {data.length === 0 &&
          <div className="row text-center p-3">
            <div className="col-12">
              <p className="text-muted">There is no items added to the catalog</p>
            </div>
          </div>
        }
      {data.length !== 0 &&
        <>
          <button type="button" className="btn naviBtn" disabled={start === 0}
            onClick={() => fetchData(0)}>|&#60;</button>
          <button type="button" className="btn naviBtn" disabled={start === 0}
            onClick={() => fetchData(offset - 1)}>&#60;</button>
          {start + 1} - {end} of {elementsCount}
          <button type="button" className="btn naviBtn" disabled={end >= elementsCount}
            onClick={() => fetchData(offset + 1)}>&#62;</button>
          <button type="button" className="btn naviBtn" disabled={end >= elementsCount}
            onClick={() => fetchData(Math.floor(elementsCount / limit))}>&#62;|
          </button>
        </>
      }
    </div>
  );
}

export default Catalog;
