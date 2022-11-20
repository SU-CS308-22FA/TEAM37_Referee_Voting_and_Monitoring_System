import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
      Referee Voting & Monitoring System
      </Link>
      <ul>
        {user && <CustomLink to="/players">Players</CustomLink>}
        {user && <CustomLink to="/matches">Matches</CustomLink>}
        {user && <CustomLink to="/referees">Referees</CustomLink>}
        {user && <CustomLink to="/profile">My Profile</CustomLink>}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
