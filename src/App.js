import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CityMapContainer from './container/CityMap';
import ReportContainer from './container/Report';

import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to cities report</h1>
                </header>

                <main className="App-container">
                    <Route exact path="/" component={CityMapContainer} />
                    <Route exact path="/reports/:cityId" component={ReportContainer} />
                </main>
            </div>
        );
    }
}

export default App;
