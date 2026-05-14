import { useEffect, useState } from 'react'

function Skills() {
  const [skillName, setSkillName] =
    useState('')

  const [skillLevel, setSkillLevel] =
    useState('Beginner')

  const [skills, setSkills] = useState(() => {
  const savedSkills = localStorage.getItem("skills")
  return savedSkills ? JSON.parse(savedSkills) : []
})
  
const [searchTerm, setSearchTerm] =
  useState('')

const [filterLevel, setFilterLevel] =
  useState('All')

  /* SAVE SKILLS */

  useEffect(() => {
    localStorage.setItem(
      'skills',
      JSON.stringify(skills)
    )
  }, [skills])

  /* ADD SKILL */

  function handleAddSkill(e) {
    e.preventDefault()

    const newSkill = {
      id: Date.now(),
      name: skillName,
      level: skillLevel,
    }

    setSkills([...skills, newSkill])

    setSkillName('')
    setSkillLevel('Beginner')
  }

  /* DELETE SKILL */

  const filteredSkills = skills.filter(
  (skill) => {
    const matchesSearch =
      skill.name
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

    const matchesLevel =
      filterLevel === 'All' ||
      skill.level === filterLevel

    return (
      matchesSearch && matchesLevel
    )
  }
)
  function deleteSkill(id) {
    const updatedSkills = skills.filter(
      (skill) => skill.id !== id
    )

    setSkills(updatedSkills)
  }

  return (
    <div className="skills-page">
      <div className="skills-header">
        <h1>Skills Manager</h1>

        <p>
          Track and manage your technical
          skills.
        </p>
      </div>

      {/* FORM */}

      <div className="controls-container">
  <form
    className="skills-form"
    onSubmit={handleAddSkill}
  >
    <input
      type="text"
      placeholder="Enter skill"
      value={skillName}
      onChange={(e) =>
        setSkillName(e.target.value)
      }
      required
    />

    <select
      value={skillLevel}
      onChange={(e) =>
        setSkillLevel(e.target.value)
      }
    >
      <option>Beginner</option>
      <option>Intermediate</option>
      <option>Advanced</option>
    </select>

    <button type="submit">
      Add Skill
    </button>
  </form>

  <div className="filter-section">
    <input
      type="text"
      placeholder="Search skills..."
      value={searchTerm}
      onChange={(e) =>
        setSearchTerm(e.target.value)
      }
    />

    <select
      value={filterLevel}
      onChange={(e) =>
        setFilterLevel(e.target.value)
      }
    >
      <option>All</option>
      <option>Beginner</option>
      <option>Intermediate</option>
      <option>Advanced</option>
    </select>
  </div>
</div>

      {/* SKILLS GRID */}

      <div className="skills-grid">
        {filteredSkills.map((skill) => (
          <div
            className="skill-card"
            key={skill.id}
          >
            <h2>{skill.name}</h2>

            <span>{skill.level}</span>

            <button
              onClick={() =>
                deleteSkill(skill.id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
