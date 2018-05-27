import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import CityMap from '../../component/CityMap';
import {getReports} from '../../reducer/Report';

class CityMapContainer extends Component {
    constructor(props) {
        super(props);

        this.onClickCity = this.onClickCity.bind(this);
    }

    componentDidMount() {
        this.props.getReports();
    }

    onClickCity(cityId) {
        this.props.changePage('/reports/' + cityId);
    }

    render() {
        const {cities} = this.props.report;
        if (cities.length === 0) 
            return null;
        
        return (
            <CityMap
                cities={cities}
                onClickCity={this.onClickCity}
            />
        );
    }
}

const mapStateToProps = ({report}) => ({report});

const mapDispatchToProps = dispatch => bindActionCreators({
    getReports,
    changePage: (route) => push(route)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CityMapContainer);
