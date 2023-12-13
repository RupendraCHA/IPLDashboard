import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const apiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getTheTeamMatchesDetails()
  }

  updatedMatchDetails = data => ({
    competingTeam: data.competing_team,
    id: data.id,
    date: data.date,
    venue: data.venue,
    result: data.result,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
    umpires: data.umpires,
    manOfTheMatch: data.man_of_the_match,
  })

  getTheTeamMatchesDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${apiUrl}${id}`)
    const fetchedData = await response.json()
    const formattedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatch: this.updatedMatchDetails(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.updatedMatchDetails(eachMatch),
      ),
    }

    this.setState({
      teamMatchesData: formattedData,
      isLoading: false,
    })
  }

  renderRecentMatchesList = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {latestMatch, teamBannerUrl} = teamMatchesData

    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" height={50} color="#ffffff" />
    </div>
  )

  getRouterClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'RR':
        return 'rr'
      case 'CSK':
        return 'csk'
      case 'SH':
        return 'sh'
      case 'DC':
        return 'dc'
      case 'KXP':
        return 'KXP'
      case 'MI':
        return 'mi'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouterClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
