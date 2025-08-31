import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopRated } from "../redux/slices/moviesSlice";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function TopRated() {
  const dispatch = useDispatch();
  const { items, page, total_pages, status, error } = useSelector(
    (s) => s.movies.topRated
  );

  useEffect(() => {
    if (status === "idle") dispatch(fetchTopRated(1));
  }, [dispatch, status]);

  const onChange = (p) => dispatch(fetchTopRated(p));

  if (status === "loading") return <div className="center">Loading top rated…</div>;
  if (status === "failed") return <div className="center error">{error}</div>;

  return (
    <section>
      <h2>Top Rated Movies</h2>
      <div className="grid">
        {items.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
      <Pagination page={page} totalPages={total_pages} onChange={onChange} />
    </section>
  );
}