import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getReport} from '../../reducer/Report';
import {LineChart} from '../../component/Report';
import {buildLineChartData} from '../../util/Report';
  
class ReportContainer extends Component {
    constructor(props) {
        super(props);

        this.buildLineChartData = this.buildLineChartData.bind(this);

        this.state = {
            data: null
        };
    }

    componentDidMount() {
        const {cityId} = this.props.match.params;
        this.props.getReport(cityId)
            .then(this.buildLineChartData);
    }

    buildLineChartData() {
        const { city } = this.props.report;
        const data = buildLineChartData(city.report.projects);

        this.setState({ data });
    }

    render() {
        const { data } = this.state;
        if (null === data) return null;

        return (
            <div>
                <Link className="App-button-back" to="/" >Back to home page</Link>
                <LineChart data={data} />
            </div>
        );
    }
}

const mapStateToProps = ({report}) => ({report});

const mapDispatchToProps = dispatch => bindActionCreators({
    getReport
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReportContainer);
