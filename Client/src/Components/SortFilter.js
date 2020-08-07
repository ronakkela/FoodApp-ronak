import React, { Component } from 'react';


class SortFilter extends Component {
    render() {
        return <div>
            <div className="Sort">Sort</div>
            <div className="block">
                <input type="radio" className="inline-block" value={1} name="sort"
                    onChange={this.props.onChange} checked={this.props.value === 1} />
                <span className="checkbox-option inline-block radio-header">Price low to high</span>
            </div>
            <div className="block">
                <input type="radio" className="inline-block" value={-1} name="sort"
                    onChange={this.props.onChange} checked={this.props.value === -1} />
                <span className="checkbox-option inline-block radio-header">Price high to low </span>
            </div>
        </div>
    }
}

export default SortFilter;