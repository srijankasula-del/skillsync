import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
  SkillSync
</Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/skills">
            Skills
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/internships">
          Internships
        </Link>
      </div>

      <Link to="/login">
        <button className="login-btn">
          Login
        </button>
      </Link>
    </nav>
  )
}

export default Navbar