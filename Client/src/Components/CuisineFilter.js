import React, { component, Component } from 'react';
import '../Styles/Search.css';

class CuisineFilter extends Component {
    render() {
        const values = this.props.value
        return <div>
            <div className="Cuisine">Cuisine</div>

            {this.props.options.map(obj => (
                <div key={obj._id} className="block">
                    <input type="checkbox" 
                        name="cuisine" 
                        className="inline-block checkbox"
                        value={obj.cuisine} 
                        onChange={this.props.onChange}
                        checked={values.findIndex(v => v == obj.cuisine) !== -1} 
                    />
                    <span className="checkbox-option inline-block North-Indian">{obj.name}</span>
                </div>
                )
            )}
        </div>

    }
}

export default CuisineFilter;

