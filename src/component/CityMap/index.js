import React, {Component} from 'react';
import {GoogleApiWrapper, Map} from 'google-maps-react';
import CityMarker from '../CityMarker';

const LoadingContainer = props => (<div>Loading...</div>);

class CityMap extends Component {
    constructor(props) {
        super(props);

        this.codeAddress = this.codeAddress.bind(this);
        this.onClickMarker = this.onClickMarker.bind(this);

        this.state = {
            markers: []
        };
    }

    componentDidMount() {
        this.props.cities.forEach(city => {
            this.codeAddress(city);
        });
    }

    codeAddress(city) {
        const geocoder = new this.props.google.maps.Geocoder();
        geocoder.geocode({ 'address': city.city }, (results, status) => {
            if (status === this.props.google.maps.GeocoderStatus.OK) {
                const {location} = results[0].geometry;
                const marker = {
                    position: {
                        lat: location.lat(),
                        lng: location.lng()
                    },
                    completeRatio: parseFloat(city.completeRatio),
                    info: city
                };
                const { markers } = this.state;
                markers.push(marker);

                this.setState({ markers });
            }
        });
    }

    onClickMarker(id) {
        this.props.onClickCity(id);
    }

    render() {
        const { markers } = this.state;
        if (markers.length === 0) return null;

        return (
            <Map
                google={this.props.google}
                initialCenter={this.props.location}
                zoom={1}
            >
                {markers.map((marker, index) =>
                    <CityMarker
                        key={index}
                        data={marker}
                        onClick={this.onClickMarker}
                    />
                )}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY,
    LoadingContainer
})(CityMap);
