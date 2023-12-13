import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()
    const formattedData = fetchedData.teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))

    this.setState({isLoading: false, teamsData: formattedData})
  }

  render() {
    const {isLoading, teamsData} = this.state
    return (
      <div className="home-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo-img"
          />
          <h1 className="page-title">IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#03BFFF" height={50} width={50} />
          </div>
        ) : (
          <ul className="teams-list-container">
            {teamsData.map(eachTeam => (
              <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
