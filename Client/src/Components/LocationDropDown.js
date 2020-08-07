import React, { Component } from 'react';
import '../Styles/Search.css';


class LocationDropDown extends Component {
  
  render() {

      return  <div className="search-location col-sm-3" >
                  <select className="input-dimensions" value={this.props.value} id="location" onChange={this.props.onChange}>
                      <option value={-1} disabled>Select location</option>
                    {this.props.citylist.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
                  </select>
              </div>  
  }
}

export default LocationDropDown; 