import React, { Component } from 'react';
import '../Styles/Search.css';

class CostFilter extends Component {
    render() {
        return <div>

                <div className="Cost-For-Two">Cost For Two</div>
                <div className="block">
                  <input type="radio" className="inline-block" name="radio"
                     value={1} onChange={this.props.onChange} checked={this.props.value === 1} />
                  <span className="checkbox-option inline-block radio-header">Less than 500</span>
               </div>
               <div className="block">
                   <input type="radio" className="inline-block" name="radio"
                    value={2} onChange={this.props.onChange} checked={this.props.value === 2} />
                    <span className="checkbox-option inline-block radio-header">₹500 to ₹1000</span>
               </div>
               <div className="block">
                   <input type="radio" className="inline-block" name="radio"
                    value={3} onChange={this.props.onChange} checked={this.props.value === 3} />
                <span className="checkbox-option inline-block radio-header">₹1000 to ₹1500</span>
               </div>
                <div className="block">
                    <input type="radio" className="inline-block" name="radio"
                     value={4} onChange={this.props.onChange} checked={this.props.value === 4} />
                    <span className="checkbox-option inline-block radio-header">₹1500 to ₹2000</span>
                </div>
                <div className="block">
                     <input type="radio" className="inline-block" name="radio"
                    value={5} onChange={this.props.onChange} checked={this.props.value === 5} />
                 <span className="checkbox-option inline-block radio-header">₹2000+</span>
                </div>
            </div>

    }
}

export default CostFilter