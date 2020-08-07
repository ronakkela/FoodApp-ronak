import React, { Component } from 'react';
import '../Styles/Search.css';
import LocationFilter from './LocationFilter';
import CuisineFilter from './CuisineFilter';
import CostFilter from './CostFilter';
import SortFilter from './SortFilter';

class FilterContainer extends Component {
    render() {
        const location = {
            area_code: this.props.values.area,
            city_code: this.props.values.city
        }
        return   <div className="filer-search">
        <div className="Filters">Filters</div>
        <LocationFilter value={location} onChange={this.props.onLocationChange} />
        <CuisineFilter options={this.props.cuisineOptions} value={this.props.values.cuisine} onChange={this.props.onCuisineChange} />
        <CostFilter value={this.props.values.cost} onChange={this.props.onCostChange} />
        <SortFilter value={this.props.values.sort} onChange={this.props.onSortChange} />
    </div>
    }
}

export default FilterContainer;