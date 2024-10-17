// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CountryList from "../components/CountryList";
import CountryInfo from '../components/CountryInfo';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CountryList} />
        <Route path="/country/:countryCode" component={CountryInfo} />
      </Switch>
    </Router>
  );
};

export default App;
