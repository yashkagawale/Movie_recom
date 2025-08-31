import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchSearch } from "../redux/slices/moviesSlice";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function SearchResult() {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const query = params.get("query") || "";
  const { items, page, total_pages, status, error } = useSelector(
    (s) => s.movies.search
  );

  useEffect(() => {
    if (query) dispatch(fetchSearch({ query, page: 1 }));
  }, [dispatch, query]);

  const onChange = (p) => {
    dispatch(fetchSearch({ query, page: p }));
    setParams({ query });
  };

  if (!query) return <div className="center">Type something in the search bar.</div>;
  if (status === "loading") return <div className="center">Searching…</div>;
  if (status === "failed") return <div className="center error">{error}</div>;

  return (
    <section>
      <h2>Results for “{query}”</h2>
      <div className="grid">
        {items.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
      {items.length > 0 && (
        <Pagination page={page} totalPages={total_pages} onChange={onChange} />
      )}
    </section>
  );
}