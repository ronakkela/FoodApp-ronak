import React from 'react';

class RestaurantTile extends React.Component {

    handleClick = (e) => {
        this.props.onClick(this.props.id)
    }
    render() {

        return <div className="Item" onClick={this.handleClick}>

            <div className="col-sm-7 col-md-8 col-lg-9 col-xs-12">
                <div className="row height">
                    <div className="col-xs-2  col-sm-4 col-md-4 col-lg-3">
                        <img alt="food" className="Image" src={this.props.src} />
                    </div>
                    <div className='col-xs-3'></div>
                    <div className="col-xs-7 col-sm-8 col-md-8 col-lg-9">
                        <div className="The-Big-Chill-Cakery">
                            {this.props.name}
                        </div>
                        <div className="fort">{this.props.city}</div>
                        <div className="address">{this.props.address}</div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-xs-3 col-sm-5 col-md-3 col-lg-3">
                        <div className="details">CUISINES:</div>
                        <div className="details">COST FOR TWO: </div>
                    </div>
                    <div className="col-xs-2"></div>
                    <div className="col-xs-7 col-sm-7 col-md-9 col-lg-9">
                        <div className="details-value">{this.props.cuisines.map(v => {

                            const cuisine = this.props.cuisinenames.find(c => c.cuisine === v)

                            if (!!cuisine) return cuisine.name
                        }).join(', ')}</div>
                    
                        <div className="details-value">₹{this.props.costfortwo}</div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default RestaurantTile;