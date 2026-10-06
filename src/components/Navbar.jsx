import { Link } from 'react-router-dom'
import './Navbar.css'
import { useState } from 'react'
import HomeIcon from '../assets/Nav Icons/Home.png'
import AboutIcon from '../assets/Nav Icons/About.png'
import ContactIcon from '../assets/Nav Icons/Contact.png'
import ProjectsIcon from '../assets/Nav Icons/Projects.png'
import SkillsIcon from '../assets/Nav Icons/Skills.png'
import BlogIcon from '../assets/Nav Icons/Blog.png'

function Navbar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <nav className={`navbar chewy-regular ${collapsed ? 'navbar--collapsed' : ''}`}>
      <Link to="/" aria-label="Home">
        <img src={HomeIcon} alt="Home" className="nav-icon nav-icon--home" />
        <span className="nav-label">Home</span>
      </Link>
      <Link to="/about" aria-label="About">
        <img src={AboutIcon} alt="About" className="nav-icon nav-icon--about" />
        <span className="nav-label">About</span>
      </Link>
      <Link to="/contact" aria-label="Contact">
        <img src={ContactIcon} alt="Contact" className="nav-icon" />
        <span className="nav-label">Contact</span>
      </Link>
      <Link to="/projects" aria-label="Projects">
        <img src={ProjectsIcon} alt="Projects" className="nav-icon" />
        <span className="nav-label">Projects</span>
      </Link>
      <Link to="/skills" aria-label="Skills">
        <img src={SkillsIcon} alt="Skills" className="nav-icon" />
        <span className="nav-label">Skills</span>
      </Link>
      <Link to="/blog" aria-label="Blog">
        <img src={BlogIcon} alt="Blog" className="nav-icon" />
        <span className="nav-label">Blog</span>
      </Link>
      
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