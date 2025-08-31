import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IMG_BASE } from "../api/movieApi";
import { fetchMovieDetail, fetchMovieCredits } from "../redux/slices/moviesSlice";

export default function MovieDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item, status, error } = useSelector((s) => s.movies.detail);
  const credits = useSelector((s) => s.movies.credits);

  useEffect(() => {
    dispatch(fetchMovieDetail(id));
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id]);

  if (status === "loading") return <div className="center">Loading movie…</div>;
  if (status === "failed") return <div className="center error">{error}</div>;
  if (!item) return null;

  const poster = item.poster_path ? IMG_BASE + item.poster_path : "";
  const bg = item.backdrop_path ? IMG_BASE + item.backdrop_path : "";

  return (
    <section className="detail">
      {bg && <div className="backdrop" style={{ backgroundImage: `url(${bg})` }} />}
      <div className="detail-body">
        {poster && <img className="poster" src={poster} alt={item.title} />}
        <div className="info">
          <h2>{item.title}</h2>
          <p className="meta">
            ⭐ {item.vote_average?.toFixed(1)} • {item.runtime} min • {item.release_date}
          </p>
          <p>{item.overview}</p>
          <div className="genres">
            {item.genres?.map((g) => (
              <span className="chip" key={g.id}>{g.name}</span>
            ))}
          </div>
          <h3>Cast</h3>
          {credits.status === "loading" ? (
            <div>Loading cast…</div>
          ) : (
            <div className="cast-strip">
              {credits.cast.slice(0, 15).map((c) => (
                <div className="cast-card" key={c.cast_id || c.credit_id}>
                  <img
                    src={c.profile_path ? IMG_BASE + c.profile_path : "https://via.placeholder.com/200x300?text=No+Image"}
                    alt={c.name}
                    loading="lazy"
                  />
                  <div className="cast-meta">
                    <div className="cast-name">{c.name}</div>
                    <div className="cast-character">{c.character}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}