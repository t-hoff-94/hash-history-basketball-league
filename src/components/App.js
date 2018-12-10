import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import TeamPage from './TeamPage';
import Articles from './Articles';
import Loading from './Loading';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />

          <Switch>
            <Route exact path= '/' component={Home} />
            <Route path='/players' component={Players} />
            <Route path='/teams' component={Teams} />
            <Route path='/:teamId' exact component={TeamPage} />
            <Route path='/:teamId/articles' component={Articles} />
            <Route render={()=> <Loading />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
