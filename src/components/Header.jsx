import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="nav">
      <Link to="/">Home </Link>
      <Link to="/login">Login </Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
