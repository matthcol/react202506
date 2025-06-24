import { useEffect, useRef, useState } from 'react';
import { Movie } from './movie.imdb';

export default function MovieListScrollable() {
  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState(25)
  const [lastPage, setLastPage] = useState<number|undefined>(undefined)
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [observerReady, setObserverReady] = useState(false);
  const [error, setError] = useState('');
  const loaderRef = useRef();
  const abortRef = useRef();

  // active observer after first batch
  useEffect(() => {
      if (movies.length > 0) {
        setObserverReady(true);
      }
  }, [movies]);

  // effect to fetch API at start and when page changes
  useEffect(() => {
    // chargement API
    const loadMore = async () => {
      if (abortRef.current) {
        abortRef.current.abort(); // Annule la requête précédente si besoin
      }
      
      if ((lastPage == undefined) || page <= lastPage) {
        console.log('Fetch page #', page)
        const controller = new AbortController()
        abortRef.current = controller;

        setLoading(true);
        try {
          const response = await fetch(
            `http://localhost:3000/movies?_page=${page}&_per_page=${pageLength}&_sort=title`, 
            {
              signal: controller.signal
            }
          );
          const data = await response.json();
          // TODO: protect a little more the extension of the list
          // - first time: replace array
          // - other pages: only add once
          setMovies(prevList => [...prevList, ...data.data]);
          setLastPage(data.last)
        } catch (err) {
          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No more movies to fetch")
      }
    }

    loadMore()
  }, [page])

  // effect to handle scrolling and fetch more pages
  useEffect(() => {
    // do not start observer until first batch is loaded
    if (!loaderRef.current || !observerReady) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        setPage(prevPage => prevPage + 1)
      }
    });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect()
  }, [loaderRef.current, loading, observerReady]);

  
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id} style={{ height: 100, border: '1px solid #ccc', margin: 5 }}>
          {movie.title} ({movie.year})
          <div>duration: {movie.runtimeMinutes}</div>
          <div>genre(s): {movie.genres.join(", ")}</div>
        </div>
      ))}

      <div ref={loaderRef} style={{ height: 50, background: 'green' }}>
        {loading ? 'Chargement...' : 'Faites défiler pour charger'}
      </div>

      { error && <div style={{ height: 50, background: 'orange' }}>
        {error}
        </div>
      }
    </div>
  );
}
