import { useState } from 'react'
import './App.css'
import { range } from './utils'
import { MovieCard } from './MovieCard'
import type { Movie } from './movie'

function App() {
  // JS/TS
  const [count, setCount] = useState(0)
  const [movieList, setMovieList] = useState<[number, Movie][]>([])
  // TODO: list of movies

  const movieEdited = (n: number, movie: Movie) => 
    setMovieList(prevMovieList =>  {
      const indexMovie = prevMovieList.findIndex(
        ([ni, _oldMovie]) => ni == n
      )
      const newMovieList = [...prevMovieList]
      if (indexMovie == -1) {
        newMovieList.push([n, movie])
      } else {
        newMovieList[indexMovie] = [n, movie]
      }
      console.log("[DEBUG] movie list edited:", newMovieList)
    // TODO: replace old one if exists
    return newMovieList
  })

  console.log('[DEBUG] Begin component App')

  // Fragment HTML
  return (
    <>
      { 
        movieList.map(([n, movie]) => `${n}#${movie.title}`)
          .join(', ')
      }

      { 
         [...range(count)].map(i => 
            <MovieCard key={i} nth={i+1} count={count} movieEdited={movieEdited}></MovieCard>)
      }
      
      <div className="card">
        <button onClick={() => setCount(prevCount => prevCount + 1)}>
          count is {count}
        </button>
      </div>

    </>
  )
}

export default App
