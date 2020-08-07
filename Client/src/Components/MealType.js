import React from 'react';

const MealType = (props) => {

    return <div className="col-sm-4" onClick={props.onClick}>
        <div className="quick-search-tile-container row">
            <div className="col-sm-5 image-container">
                <img src={props.thumb} />
            </div>
            <div className="col-sm-7 content-bar">
                <div className="content-heading row">{props.name}</div>
                <div className="content-text row">{props.content}</div>
            </div>
        </div>
    </div>
}
export default MealType;

