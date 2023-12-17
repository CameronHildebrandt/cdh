import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li key="home">
            <Link to="/">Home</Link>
          </li>
          <li key="blog">
            <Link to="/blogs">Blog</Link>
          </li>
          <li key="contact">
            <Link to="/contact">Contact</Link>
          </li>
          <li key="github">
            <Link to="/git">GitHub</Link>
          </li>
          <li key="linkedin">
            <Link to="/linkedin">LinkedIn</Link>
          </li>
          <li key="capstone">
            <Link to="/capstone">Capstone</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;