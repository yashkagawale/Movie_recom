import React from "react";
import { Link } from "react-router-dom";
import { IMG_BASE } from "../api/movieApi";

export default function MovieCard({ movie }) {
  const img = movie.poster_path
    ? IMG_BASE + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img src={img} alt={movie.title} loading="lazy" />
      <div className="movie-meta">
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average?.toFixed(1) ?? "N/A"}</p>
        <p>{movie.release_date}</p>
      </div>
    </Link>
  );
}