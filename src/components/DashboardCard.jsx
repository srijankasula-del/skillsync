function DashboardCard({
  number,
  title,
  description,
}) {
  return (
    <div className="dashboard-card">
      <h2>{number}</h2>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  )
}

export default DashboardCard