import DashboardCard from '../components/DashboardCard'

function Dashboard() {

  const skills =
    JSON.parse(
      localStorage.getItem('skills')
    ) || []

  const projects =
    JSON.parse(
      localStorage.getItem('projects')
    ) || []

  const internships =
    JSON.parse(
      localStorage.getItem(
        'internships'
      )
    ) || []

  const skillsProgress = Math.min(
  skills.length * 10,
  100
)

const completedProjects =
  projects.filter(
    (project) =>
      project.status === "Completed"
  ).length

const projectsProgress =
  projects.length > 0
    ? Math.round(
        (completedProjects /
          projects.length) *
          100
      )
    : 0

const internshipReadiness = Math.min(
  skills.length * 5 +
    completedProjects * 15,
  100
)
    return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <h1>
          Welcome back, Srijan
        </h1>

        <p>
          Track your engineering
          progress and career
          journey.
        </p>
      </div>

      <div className="dashboard-grid">

        <DashboardCard
          number={skills.length}
          title="Skills Added"
          description="Frontend and backend technologies"
        />

        <DashboardCard
          number={projects.length}
          title="Projects Completed"
          description="Personal and academic projects"
        />

        <DashboardCard
          number={internships.length}
          title="Internship Applications"
          description="Applications submitted successfully"
        />


      </div>

      <div className="progress-wrapper">

        <div className="progress-section">

          <div className="progress-card">

            <div className="progress-info">
              <span>
                Skills Progress
              </span>

              <span>{skillsProgress}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${skillsProgress}%`,
                }}
              ></div>
            </div>

          </div>

          <div className="progress-card">

            <div className="progress-info">
              <span>
                Projects Completion
              </span>

              <span>{projectsProgress}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${projectsProgress}%`,
                }}
              ></div>
            </div>

          </div>

          <div className="progress-card">

            <div className="progress-info">
              <span>
                Internship Readiness
              </span>

              <span>{internshipReadiness}%</span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${internshipReadiness}%`,
                }}
              ></div>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard