import React from 'react';
import '../Styles/Home.css';
import ResturantSearchContainer from './ResturantSearchContainer';
import QuickSearchContainer from './QuickSearchContainer';
import Axios from 'axios';
import Header1 from './Header1';



class Home extends React.Component {
    state = {
        citylist: [],
        selectedLocation: null,
        restaurantlist: []
    }
    componentDidMount() {
        Axios.get("http://localhost:9800/citylist").then(res => {
            this.setState({
                citylist: res.data.citylist.map(v => {
                    v.name = `${v.area}, ${v.city}`
                    return v
                })
            })
        })
    }

    handleSelectLocation = (location) => {

        if (location.length > 0) {

            this.setState({ selectedLocation: location[0] }, () => {
                const { area_code, city_code } = this.state.selectedLocation
                const url = `http://localhost:9800/restaurant?city=${city_code}&area=${area_code}`
                Axios.get(url).then(res => this.setState({
                    restaurantlist: res.data.result.map(v => {
                        v.id = v._id
                        return v
                    })
                }))
            })
        }
    }

    handleSelectRestaurant = (selected) => {
        if (selected.length > 0)
            this.props.history.push('/details/' + selected[0]._id)
    }

    render() {

        return (<div>
                  <Header1/>
                <div>
                 <ResturantSearchContainer
                    citylist={this.state.citylist}
                    restaurantlist={this.state.restaurantlist}
                    selectedLocation={this.state.selectedLocation}
                    onSelectLocation={this.handleSelectLocation}
                    onSelectRestaurant={this.handleSelectRestaurant}
                />
                <QuickSearchContainer 
                    selectedLocation={this.state.selectedLocation} 
                    history={this.props.history}
                />
                </div>
            </div>
        )
    }
}

export default Home;