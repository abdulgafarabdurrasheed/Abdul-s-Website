import { Link } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'

function Navbar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav className={`navbar chewy-regular ${collapsed ? 'navbar--collapsed' : ''}`}>
      <Link to="/" aria-hidden={collapsed} tabIndex={collapsed ? -1 : 0}>Home</Link>
      <Link to="/about" aria-hidden={collapsed} tabIndex={collapsed ? -1 : 0}>About</Link>
      <Link to="/contact" aria-hidden={collapsed} tabIndex={collapsed ? -1 : 0}>Contact</Link>
      <Link to="/contact" aria-hidden={collapsed} tabIndex={collapsed ? -1 : 0}>Projects</Link>
      <Link to="/contact" aria-hidden={collapsed} tabIndex={collapsed ? -1 : 0}>Skills</Link>
      <Link to="/contact" aria-hidden={collapsed} tabIndex={collapsed ? -1 : 0}>Blog</Link>
      
      <button
        className="collapsible-icon"
        type="button"
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed((isCollapsed) => !isCollapsed)}
      >
        <i className={`fa-solid ${collapsed ? 'fa-maximize' : 'fa-minimize'}`} aria-hidden="true"></i>
      </button>
    </nav>
  )
}

export default Navbar