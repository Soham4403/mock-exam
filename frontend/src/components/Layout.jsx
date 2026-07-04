import { setRoute } from '../utils'

const menu = ['dashboard', 'products', 'cart', 'orders']

function Layout({ route, user, logout, children }) {
  return (
    <div className="app">
      <aside className="sidebar">
        <h2>ShopAdmin</h2>
        {menu.map((item) => (
          <button
            key={item}
            className={route === item || route.startsWith('product/') && item === 'products' ? 'active' : ''}
            onClick={() => setRoute(item)}
          >
            {item}
          </button>
        ))}
        <button className="logout" onClick={logout}>Logout</button>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <strong>{user?.name || 'Student'}</strong>
            <span> Dashboard</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}

export default Layout
