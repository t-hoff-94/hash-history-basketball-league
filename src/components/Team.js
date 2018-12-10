import { Component } from 'react';
import PropTypes from 'prop-types';
import { getTeam } from '../api';

class Team extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired,
  }

  state = {
    team: null,
  }

  componentWillReceiveProps(nextProps) {
  if (nextProps.id !== this.props.id) {
    this.fetchTeam(nextProps.id)
  }
  }

  componentDidMount () {
    this.fetchTeam(this.props.id)
  }

  fetchTeam = (id) => {
    this.setState(()=>({
      team: null
    }))

    getTeam(id)
      .then((team)=> this.setState(()=>({ team: team })));
  }

  render() {
    return this.props.children(this.state.team)
  }
}

export default Team;
