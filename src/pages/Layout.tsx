import { Outlet, Link } from "react-router-dom";

// TODO: add in a fancy loading blocker with nice animations - it probs shouldn't go away after a redirect
// TODO: make the fancy single page thing, hooked up to scrolling
// TODO: figure out how to stop the redirect from resending if user presses back

const Layout = () => {
  return (
    <>
      <div className="main">
        <nav className="nav_container">
          <Link to="/" className="nav_element nav_element_active">Home</Link>
          <Link to="/blogs" className="nav_element">Blog</Link>
          <Link to="/contact" className="nav_element">Contact</Link>
          <Link to="/capstone" className="nav_element">Capstone</Link>
          <Link to="/github" className="nav_element">GitHub</Link>
          <Link to="/linkedin" className="nav_element">LinkedIn</Link>
        </nav>

        <div className="content_container">
          <Outlet />
        </div>
      </div>
    </>
  )
};

export default Layout;