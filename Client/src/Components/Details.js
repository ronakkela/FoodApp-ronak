import React from 'react';
import '../Styles/Details.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Axios from 'axios';
import Header1 from './Header1';

class Details extends React.Component {
  state = {
    restaurant: { cuisines: [], gallery: [] }, 
    cuisinenames: [], 
  }
  componentDidMount() {
    const { restaurant_id } = this.props.match.params
    const url = "http://localhost:9800/restaurant/" + restaurant_id
    Axios.get(url).then(res => {
      this.setState({ restaurant: res.data.restaurant })

    })
    Axios.get("http://localhost:9800/cuisine").then(res => {
      this.setState({ cuisinenames: res.data.cuisines })

    })
  }

  render() {
    const { restaurant } = this.state

    return (
      <div>
        <Header1 />
        <div className="imageContainerdisplay">

          <Carousel showThumbs={false}>
              {restaurant.gallery.map((imgsrc, index) => {
                  return <div>
                      <img src={imgsrc} />
                      <p className="legend">{`Image ${index}`}</p>
                  </div>
              })}
          </Carousel>
          
        </div>



        <div className="heading">{restaurant.name}</div>
        <div className="detailsContainer"></div>
        <Tabs>
          <TabList>
            <Tab className="overview">Overview</Tab>
            <Tab className="contact">Contact</Tab>
          </TabList>
          
          <TabPanel>
            <h2 className="about">About this place</h2>
            <h2 className="cuisine">Cuisine</h2>
            <h2 className="cuisineType">
              {
                restaurant.cuisines.map(v => {
                  const cuisine = this.state.cuisinenames.find(c => c.cuisine === v)
                  if (!!cuisine) return cuisine.name
                }).join(', ')
              }
            </h2>
            <h2 className="cost">Average Cost</h2>
            <h2 className="approxCost">₹{restaurant.costfortwo} for two people (approx.)</h2>
          </TabPanel>
          <TabPanel>
            <h2 className="Phone-Number">Phone Number</h2>
            <p className="Number">+91 {restaurant.contact} </p>
            <h2 className="The-Big-Chill-Cakery">{restaurant.name}</h2>
            <p className="Shopadress">{restaurant.address}</p>
          </TabPanel>
        </Tabs>

      </div>

    )
  }
}

export default Details;