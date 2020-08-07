import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import Axios from 'axios';


class LocationFilter extends Component {
    state = {
        citylist: []
    }
    componentDidMount() {
        Axios.get("http://localhost:9800/citylist").then(res => this.setState({
            citylist: res.data.citylist.map(v => {
                v.name = `${v.area}, ${v.city}`
                v.id = v._id
                return v
            })
        }))
    }

    renderDropdownChildren(location){

        return `${location.area}, ${location.city}`
    }
    render() {
                
        return <div>
            <div className="Select-Location">Select Location</div>
            <Typeahead
            id="id_location_selector"
            onChange={this.props.onChange}
            options={this.state.citylist}
            labelKey="name"
            placeholder="Enter location Name"
            renderMenuItemChildren={this.renderDropdownChildren}
        />
        </div>
    }
}

export default LocationFilter;