import StatsCard from '../components/StatsCard'
import { Link } from "react-router-dom"

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Track Your Engineering Journey
          </h1>

          <p>
            Manage skills, internships, projects and certifications
            in one centralized student dashboard.
          </p>

          <Link to="/dashboard">
  <button className="hero-btn">
    Get Started
  </button>
</Link>
        </div>
      </section>

      <section className="stats-section">
        <StatsCard
          number="120+"
          title="Skills Added"
        />

        <StatsCard
          number="45+"
          title="Projects Completed"
        />

        <StatsCard
          number="80+"
          title="Internship Applications"
        />

        <StatsCard
          number="60+"
          title="Certifications Earned"
        />
      </section>
    </>
  )
}

export default Home