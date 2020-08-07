import React, { Component } from 'react';
import Logo from './Logo';
import Heading from './Heading';
import { Typeahead } from 'react-bootstrap-typeahead';
import '../Styles/Home.css';



class ResturantSearchContainer extends Component {


  renderDropdownChildren = (location) => {
    return  `${location.area}, ${location.city}`
  }
    renderDropdownChildren1 = (restaurant) => {
      return `${restaurant.name}, ${restaurant.city}`
  }
  


  render() {
    const {  citylist, restaurantlist } = this.props
    return ( 


      <div className="App">
      
        <div className='imagebox container-fluid'>
        
          <Logo />
          <Heading />

          <div className="col-sm-2 col-md-4 col-lg-9">
            <div className="homesearch-location">
              <Typeahead
                id="id_location_selector"
                onChange={this.props.onSelectLocation}
                options={citylist}
                labelKey="name"
                placeholder="Enter Location Name"
                renderMenuItemChildren={(option, props, index) => {
                  return this.renderDropdownChildren(option);
              }}
              />
            </div>
              <div className="homesearch-location">
                <Typeahead
                  id="id_restaurant_selector"
                  onChange={this.props.onSelectRestaurant}
                  options={restaurantlist}
                  labelKey="name"
                  placeholder="Enter Restaurant Name"
                  renderMenuItemChildren={(option, props, index) => {
                    return this.renderDropdownChildren1(option);
                }}
                />
              </div>
            </div>
          </div>
        </div>
     
    )
  }
}
export default ResturantSearchContainer;