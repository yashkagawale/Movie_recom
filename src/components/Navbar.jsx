import React, { useState } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";

export default function Navbar() {
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ query: q.trim() })}`
    });
    setQ("");
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand"> <span className="material-icons icon">movie</span> MovieBox</Link>

      <form onSubmit={onSubmit} className="search">
        <input
          type="text"
          placeholder="Search movies..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit"><span className="material-icons">search</span></button>
      </form>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className="material-icons">
          {menuOpen ? "close" : "menu"}
        </span>
      </button>

      <nav className={`navlinks ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Popular</Link>
        <Link to="/top-rated" onClick={() => setMenuOpen(false)}>Top Rated</Link>
        <Link to="/upcoming" onClick={() => setMenuOpen(false)}>Upcoming</Link>
      </nav>
    </header>
  );
}
