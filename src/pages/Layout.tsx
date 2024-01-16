import { Outlet, Link } from "react-router-dom";
import Navbar from "./Navbar";

// TODO: add in a fancy loading blocker with nice animations - it probs shouldn't go away after a redirect, instead after a second show buttons to dismiss or manually open redirect
// TODO: make the fancy single page thing, hooked up to scrolling
// TODO: figure out how to stop the redirect from resending if user presses back

const Layout = () => (
  <div className="main">
    <Navbar />
    <Outlet />
  </div>
);

export default Layout;