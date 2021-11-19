import React from "react";

const Comment = ({
    comment = [],
}) => {
    return (
        <>
            {comment && <div className="container rounded border border-secondary border-1 mb-4">
                <div key={comment.id} className="h5 text-left" key={"comment author" + Math.random()}>
                    {comment.author}
                </div>
                <div className="" key={"comment text" + Math.random()}>
                    {comment.text}
                </div>
            </div>}
        </>
    );
}

export default Comment;