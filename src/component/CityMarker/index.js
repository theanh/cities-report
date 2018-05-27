import React, {Component} from 'react';
import {Marker} from 'google-maps-react';

class CityMarker extends Component {
    constructor(props) {
        super(props);

        this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
        this.onMouseoutMarker = this.onMouseoutMarker.bind(this);
        this.onClick = this.onClick.bind(this);

        this.infoWindow = null;
    }
    
    setIconUrl(completeRatio) {
        let iconUrl = '';
        switch(true) {
            case (completeRatio <= 50):
                iconUrl = '/assets/free-map-marker-icon-red.png';
                break;

            case (completeRatio <= 80):
                iconUrl = '/assets/free-map-marker-icon-orange.png';
                break;
                
            case (completeRatio <= 99):
                iconUrl = '/assets/free-map-marker-icon-blue.png';
                break;

            default:
                iconUrl = '/assets/free-map-marker-icon-green.png';
        };

        return iconUrl;
    }

    renderInfoWindowContent(info) {
        return '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">' + info.city + '</h1>'+
        '<div id="bodyContent">'+
        '<p>Complete ratio: <b>' + info.completeRatio + '</b>.</p>'+
        '<p>Number of devices: <b>' + info.numberOfDevice + '</b>.</p>'+
        '<p>Top projects: <b>' + info.topProjects.join(', ') + '</b>.</p>'+
        '</div>'+
        '</div>';
    }

    onMouseoverMarker(props, marker, e) {
        this.infoWindow = new props.google.maps.InfoWindow({content: this.renderInfoWindowContent(props.data.info)});
        this.infoWindow.open(props.map, marker);
    }

    onMouseoutMarker() {
        this.infoWindow.close();
    }

    onClick() {
        this.props.onClick(this.props.data.info.id);
    }

    render() {
        return (
            <Marker
                {...this.props}
                position={this.props.data.position}
                icon={{
                    url: this.setIconUrl(this.props.data.completeRatio),
                    scaledSize: new this.props.google.maps.Size(32,32)
                }}
                onMouseover={this.onMouseoverMarker}
                onMouseout={this.onMouseoutMarker}
                onClick={this.onClick}
            />
        );
    }
}

export default CityMarker;
