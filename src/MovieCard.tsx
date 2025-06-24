import { useId, useState, type FC } from "react"
import type { Movie } from "./movie"

type Props = {
    nth: number;
    count: number;
    movieEdited: any
}


// export function MovieCard({nth, count}: Props) {
export const MovieCard: FC<Props> = ({nth, count, movieEdited}) => {
  console.log('[DEBUG] Begin component MovieCard')

  const movieId = useId()
  // NB: useId is not very useful here => demonstration purpose only

  const [movie, setMovie] = useState<Movie|undefined>(undefined)

  const formChanged = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setMovie(prevMovie => {
        let newMovie = prevMovie ? {...prevMovie} : { id: movieId, title: '', year: 0}
        newMovie[event.target.id] = event.target.value // TODO: convert type if necessary or split handler
        console.log('[DEBUG] set movie:', prevMovie, ' -> ', newMovie)
        return newMovie
    })
    console.log('[DEBUG] movie form changed:', movie)
    
  }

  //   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log("[DEBUG] submit edit movie finished")
    movieEdited(nth, movie)
  }

  console.log('[DEBUG] render movie:', movie)

  return (
    <>
      <h2 id={movieId}>Movie Card {nth}/{count}
      {movie && `: ${movie.title} (${movie.year})`}
      </h2> 
      <form onSubmit={handleSubmit}>
        <div>title <input id="title" name="title" type="text" onChange={formChanged}></input></div>
        <div>year <input id="year" name="year" type="number"onChange={formChanged}></input></div>
        <div><button>OK</button></div>
      </form>
    </>
  )
}