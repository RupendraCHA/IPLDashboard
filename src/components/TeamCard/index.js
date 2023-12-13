import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails

  return (
    <li className="link-item">
      <Link className="route-link" to={`/team-matches/${id}`}>
        <img src={teamImageUrl} alt={`${name}`} className="team-img" />
        <p className="team-name">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
