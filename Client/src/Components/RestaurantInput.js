import React, { Component } from 'react';
import '../Styles/Search.css';


class RestaurantInput extends Component {
    render() {
        return <div className="search-location row col-sm-4" >

            <input className="input-dimensions" placeholder="Search Restaurant" type="text"></input>

        </div>

    }
}

export default RestaurantInput;