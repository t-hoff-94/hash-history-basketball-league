import React, { Component } from 'react';
import Sidebar from './Sidebar';
import { Route, Link } from 'react-router-dom';
import { getTeamNames } from '../api';
import Team from './Team';
import TeamLogo from './TeamLogo';
import Loading from './Loading';

class Teams extends Component {
  state = {
    teams: [],
    loading: true,
  }

  componentDidMount() {
    getTeamNames()
      .then(teams => this.setState(()=> ({
        teams: teams,
        loading: false
      })))
  }

  render() {
    const { teams, loading } = this.state;
    const { location, match } = this.props;

    return (
      <div className='container two-column'>
        <Sidebar
          loading={loading}
          title='Teams'
          list={teams}
          {...this.props}/>

        {loading === false && location.pathname === '/teams'
            ? <div className='sidebar-instruction'>Select a Team</div>
            : null}

        <Route path={`${match.url}/:teamId`} render={({ match }) => {
            if(loading === true) return null

            return (
              <div className='panel'>
                <Team id={match.params.teamId}>
                  {(team) => team ===  null
                    ? <Loading />
                    : <div style={{width: '100%'}}>
                        <TeamLogo id={team.id} className='center' />
                        <h1 className='medium-header'>{team.name}</h1>
                        <ul className='info-list row'>
                          <li>Established<div>{team.established}</div></li>
                          <li>Manager<div>{team.manager}</div></li>
                          <li>Coach<div>{team.coach}</div></li>
                        </ul>
                        <Link
                          className='center btn-main'
                          to={`/${match.params.teamId}`}>
                          {team.name} Team Page
                        </Link>
                      </div>}
                </Team>
              </div>
            )
          }}/>
      </div>
    )
  }
}

export default Teams;
