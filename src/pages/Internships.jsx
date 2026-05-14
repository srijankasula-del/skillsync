import { useEffect, useState } from 'react'

function Internships() {
  const [companyName, setCompanyName] =
    useState('')

  const [role, setRole] =
    useState('')

  const [status, setStatus] =
    useState('Applied')

const [internships, setInternships] = useState(() => {
  const savedInternships =
    localStorage.getItem("internships")

  return savedInternships
    ? JSON.parse(savedInternships)
    : []
})

const [editId, setEditId] =
  useState(null)

  const [searchTerm, setSearchTerm] =
    useState('')

  const [filterStatus, setFilterStatus] =
    useState('All')

    useEffect(() => {
  localStorage.setItem(
    "internships",
    JSON.stringify(internships)
  )
}, [internships])

  /* SAVE DATA */

  useEffect(() => {
    localStorage.setItem(
      'internships',
      JSON.stringify(internships)
    )
  }, [internships])

  /* ADD INTERNSHIP */

function handleAddInternship(e) {
  e.preventDefault()

  if (editId) {
    const updatedInternships =
      internships.map((internship) =>
        internship.id === editId
          ? {
              ...internship,
              company: companyName,
              role,
              status,
            }
          : internship
      )

    setInternships(
      updatedInternships
    )

    setEditId(null)
  } else {
    const newInternship = {
      id: Date.now(),

      company: companyName,

      role,

      status,
    }

    setInternships([
      ...internships,
      newInternship,
    ])
  }

  setCompanyName('')
  setRole('')
  setStatus('Applied')
}

function handleEdit(internship) {
  setCompanyName(
    internship.company
  )

  setRole(internship.role)

  setStatus(internship.status)

  setEditId(internship.id)
}

  /* DELETE INTERNSHIP */

  function deleteInternship(id) {
    const updatedInternships =
      internships.filter(
        (internship) =>
          internship.id !== id
      )

    setInternships(updatedInternships)
  }

  /* FILTER */

  const filteredInternships =
    internships.filter(
      (internship) => {
        const matchesSearch =
          internship.company
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )

        const matchesStatus =
          filterStatus === 'All' ||
          internship.status ===
            filterStatus

        return (
          matchesSearch &&
          matchesStatus
        )
      }
    )

  return (
    <div className="internships-page">
      <div className="internships-header">
        <h1>Internship Tracker</h1>

        <p>
          Manage and track your
          internship applications.
        </p>
      </div>

      {/* FORM */}

      <form
        className="internships-form"
        onSubmit={
          handleAddInternship
        }
      >
        <input
          type="text"
          placeholder="Company name"
          value={companyName}
          onChange={(e) =>
            setCompanyName(
              e.target.value
            )
          }
          required
        />

        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          required
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Applied</option>

          <option>Interview</option>

          <option>Rejected</option>

          <option>Selected</option>
        </select>

        <button type="submit">
          {editId
  ? 'Update Internship'
  : 'Add Internship'}
        </button>
      </form>

      {/* FILTER */}

      <div className="internships-filter">
        <input
          type="text"
          placeholder="Search company..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
        >
          <option>All</option>

          <option>Applied</option>

          <option>Interview</option>

          <option>Rejected</option>

          <option>Selected</option>
        </select>
      </div>

      {/* GRID */}

      <div className="internships-grid">
        {filteredInternships.map(
          (internship) => (
            <div
              className="internship-card"
              key={internship.id}
            >
              <h2>
                {internship.company}
              </h2>

              <p>
                Role:
                {' '}
                {internship.role}
              </p>

              <span>
                {internship.status}
              </span>

              <div className="internship-actions">
  <button
    className="edit-btn"
    onClick={() =>
      handleEdit(internship)
    }
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() =>
      deleteInternship(
        internship.id
      )
    }
  >
    Delete
  </button>
</div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Internships