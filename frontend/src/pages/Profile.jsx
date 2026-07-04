function Profile({ user }) {
  return (
    <div>
      <h1>Profile</h1>
      <div className="card profile-card">
        <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
        <div>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <span className="badge">Logged in user</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
