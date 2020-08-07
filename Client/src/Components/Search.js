import React from 'react';
import QueryString from 'query-string';
import Pagination from 'react-js-pagination';
import RestaurantTile from './RestaurantTile';
import FilterContainer from './FilterContainer';
import Axios from 'axios';
import Header1 from './Header1';

const PAGE_SIZE = 3
const PAGE_DISPLAY_RANGE = 5

class Search extends React.Component {

    state = {
        cuisinenames: [],
        restaurantlist: [],
        mealnames: [],
        itemCount: 0,
        filters: {
            city: null,
            area: null,
            cuisine: [],
            mealtype: [],
            cost: null,
            sort: 1,
            page: 1
        }
    }

    componentDidMount() {
        let { city, area, cuisine, mealtype, cost, sort, page } = QueryString.parse(this.props.location.search)

        city = !city ? null : Number(city)
        area = !area ? null : Number(area)
        cost = !cost ? null : Number(cost)
        sort = !sort ? 1 : Number(sort)
        page = !page ? 1 : Number(page)

        if (!cuisine) cuisine = []
        else {
            if (cuisine instanceof Array) cuisine = cuisine.map(v => Number(v))
            else cuisine = [Number(cuisine)]
        }
        if (!mealtype) mealtype = []
        else {
            if (mealtype instanceof Array) mealtype = mealtype.map(v => Number(v))
            else mealtype = [Number(mealtype)]
        }

        Axios.get(`http://localhost:9800/restaurant${this.props.location.search}`).then(res =>
            this.setState({ restaurantlist: res.data.result, itemCount: res.data.itemCount }
            ))
        Axios.get(`http://localhost:9800/cuisine`).then(res =>
            this.setState({ cuisinenames: res.data.cuisines }
            ))

        Axios.get(`http://localhost:9800/mealtype`).then(res =>
            this.setState({ mealnames: res.data.mealtypes }
            ))

        this.setState({ filters: { city, area, cuisine, mealtype, cost, sort, page } })
    }

    fetchQuery = () => {
        const filters = this.state.filters

        const query = `?${QueryString.stringify({ ...filters })}`

        if (query !== this.props.location.search) {
            const url = "http://localhost:9800/restaurant" + query
            Axios.get(url).then(res => this.setState({ restaurantlist: res.data.result, itemCount: res.data.itemCount }))
            this.props.history.push(`${this.props.location.pathname}${query}`)
        }

    }

    handleLocationChange = (location) => {
        if (!!location[0]) {
            const filters = this.state.filters
            filters.city = location[0].city_code
            filters.area = location[0].area_code
            this.setState({ filters }, this.fetchQuery)
            
        }
    }

    handleCuisineChange = (event) => {
        let { value, checked } = event.target
        const filters = this.state.filters
        value = Number(value)

        const inTheArray = filters.cuisine.findIndex(v => v === value) !== -1

        if (checked && !inTheArray) {
            filters.cuisine = [...filters.cuisine, value]

        } else if (!checked && inTheArray) {

            const index = filters.cuisine.findIndex(v => v === value)
            filters.cuisine.splice(index, 1)
        }

        this.setState({
            filters
        }, this.fetchQuery)
    }
    handleCostChange = (event) => {
        const filters = this.state.filters
        filters.cost = Number(event.target.value)
        this.setState({ filters }, this.fetchQuery)
    }
    handleSortChange = (event) => {
        const filters = this.state.filters
        filters.sort = Number(event.target.value)
        this.setState({ filters }, this.fetchQuery)
    }

    handlePageChange = (pageNumber) => {
        const filters = this.state.filters

        filters.page = pageNumber
        this.setState({ filters }, this.fetchQuery)

    }

    handleRestaurantClick = (restaurant_id) => {
        this.props.history.push(`/details/` + restaurant_id)
    }

    render() {

        const { restaurantlist, filters } = this.state
        return (
            <div>
                <Header1 />
                <div class="container-fluid">

                    {filters.mealtype.length === 0 ? <h3>All Meal Options</h3> :
                        <h3> {filters.mealtype.map(v => {

                            const meal = this.state.mealnames.find(c => c.mealtype === v)

                            if (!!meal) return meal.name
                        }).join(', ')} Options </h3>}

            <div class="row">
                        <div class="col-sm-9 col-md-3 col-lg-3">
                            <div className="search-container">
                                <FilterContainer
                                    cuisineOptions={this.state.cuisinenames}
                                    values={filters}
                                    onLocationChange={this.handleLocationChange}
                                    onCuisineChange={this.handleCuisineChange}
                                    onCostChange={this.handleCostChange}
                                    onSortChange={this.handleSortChange}
                                />
                            </div>
                        </div>
                                
                        <div class="col-sm-9 col-md-3 col-lg-8">
                            {restaurantlist.length === 0 ? <h3>No Result Found</h3> :
                                restaurantlist.map(v => <RestaurantTile
                                    onClick={this.handleRestaurantClick}
                                    key={v._id}
                                    id={v._id}
                                    src={v.thumb}
                                    name={v.name}
                                    city={v.city}
                                    address={v.address}
                                    cuisines={v.cuisines}
                                    costfortwo={v.costfortwo}
                                    cuisinenames={this.state.cuisinenames}
                                />)}

                                <Pagination
                                    activePage={filters.page}
                                    itemsCountPerPage={PAGE_SIZE}
                                    totalItemsCount={this.state.itemCount}
                                    pageRangeDisplayed={PAGE_DISPLAY_RANGE}
                                    onChange={this.handlePageChange}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                        </div>                                            
                                                
                    </div>
                </div>
            </div>

        )
    }
}

export default Search;