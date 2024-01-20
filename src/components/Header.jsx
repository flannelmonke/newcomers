import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="nav">
      <Link to="/">Login </Link>
      <Link to="/home">Home </Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
