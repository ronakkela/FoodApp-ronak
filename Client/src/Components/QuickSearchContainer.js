import React, { Component } from 'react';
import '../Styles/Home.css';
import MealType from './MealType';
import Axios from 'axios';

class QuickSearchContainer extends Component {
    state = {
        mealtypes: []
    }
    componentDidMount() {
        Axios.get("http://localhost:9800/mealtype").then(res => {
            this.setState({ mealtypes: res.data.mealtypes })
        })
    }
    handleMealTypeClick = (mealtype, e) => {
        if(!this.props.selectedLocation)
            this.props.history.push(`/search?mealtype=${mealtype}`)
        else{
            const city_code = this.props.selectedLocation.city_code
            const area_code = this.props.selectedLocation.area_code
            this.props.history.push(`/search?mealtype=${mealtype}&city=${city_code}&area=${area_code}`)
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="container">
                    <div className="header">Quick Searches</div>
                    <div className="quick-search-subheading">Discover restaurants by type of meal</div>
                    <div className="row">
                        {this.state.mealtypes.slice(0, 3).map(v =>
                            <MealType key={v._id} {...v} onClick={() => this.handleMealTypeClick(v.mealtype)} />
                        )}

                    </div>

                    <div className="row">
                        {this.state.mealtypes.slice(3, 6).map(v =>
                            <MealType key={v._id} {...v} onClick={() => this.handleMealTypeClick(v.mealtype)} />
                        )}

                    </div>
                </div>
            </div>

        )
    }
}
export default QuickSearchContainer;