import { useEffect, useState } from 'react'

function Projects() {
  const [projectName, setProjectName] =
    useState('')

  const [techStack, setTechStack] =
    useState('')

  const [status, setStatus] =
    useState('In Progress')

const [projects, setProjects] = useState(() => {
  const savedProjects = localStorage.getItem("projects")
  return savedProjects ? JSON.parse(savedProjects) : []
})

    const [editId, setEditId] =
  useState(null)

  const [searchTerm, setSearchTerm] =
  useState('')

const [filterStatus, setFilterStatus] =
  useState('All')

  useEffect(() => {
  localStorage.setItem(
    "projects",
    JSON.stringify(projects)
  )
}, [projects])



  /* SAVE PROJECTS */

  useEffect(() => {
    localStorage.setItem(
      'projects',
      JSON.stringify(projects)
    )
  }, [projects])

  /* ADD PROJECT */

  function handleAddProject(e) {
  e.preventDefault()

  if (editId) {
    const updatedProjects =
      projects.map((project) =>
        project.id === editId
          ? {
              ...project,
              name: projectName,
              stack: techStack,
              status,
            }
          : project
      )

    setProjects(updatedProjects)

    setEditId(null)
  } else {
    const newProject = {
      id: Date.now(),

      name: projectName,

      stack: techStack,

      status,
    }

    setProjects([
      ...projects,
      newProject,
    ])
  }

  setProjectName('')
  setTechStack('')
  setStatus('In Progress')
}

function handleEdit(project) {
  setProjectName(project.name)

  setTechStack(project.stack)

  setStatus(project.status)

  setEditId(project.id)
}

  /* DELETE PROJECT */

  const filteredProjects =
  projects.filter((project) => {
    const matchesSearch =
      project.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

    const matchesStatus =
      filterStatus === 'All' ||
      project.status === filterStatus

    return (
      matchesSearch &&
      matchesStatus
    )
  })

  function deleteProject(id) {
    const updatedProjects =
      projects.filter(
        (project) => project.id !== id
      )

    setProjects(updatedProjects)
  }

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>Projects Manager</h1>

        <p>
          Organize and track your
          engineering projects.
        </p>
      </div>

      {/* FORM */}

      <form
        className="projects-form"
        onSubmit={handleAddProject}
      >
        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) =>
            setProjectName(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Tech stack"
          value={techStack}
          onChange={(e) =>
            setTechStack(e.target.value)
          }
          required
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>In Progress</option>
          <option>Completed</option>
          <option>Planned</option>
        </select>

        <button type="submit">
          {editId
  ? 'Update Project'
  : 'Add Project'}
        </button>
      </form>

      <div className="projects-filter">
  <input
    type="text"
    placeholder="Search projects..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
  />

  <select
    value={filterStatus}
    onChange={(e) =>
      setFilterStatus(e.target.value)
    }
  >
    <option>All</option>
    <option>In Progress</option>
    <option>Completed</option>
    <option>Planned</option>
  </select>
</div>

      {/* PROJECTS GRID */}

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div
            className="project-card"
            key={project.id}
          >
            <h2>{project.name}</h2>

            <p>
              Tech Stack:
              {' '}
              {project.stack}
            </p>

            <span>{project.status}</span>

            <div className="project-actions">
  <button
    className="edit-btn"
    onClick={() =>
      handleEdit(project)
    }
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      deleteProject(project.id)
    }
  >
    Delete
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects