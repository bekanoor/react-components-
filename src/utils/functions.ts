import { Movie } from 'src/models'

const getGenreOutput = (item: string[] | undefined) => {
  if(item === undefined) return
  return item.length > 2 ? item.join(', ') : item.join(' & ')
}

const matchedMovies = (
  searchType: string,
  searchInput: string,
  data: Array<Movie>,
  filterOption: string = 'rating'
) => {
  let matched: Array<object> = []

  if (searchType === 'title') {
    matched = data.filter((item) =>
      item.title.toLowerCase().startsWith(searchInput)
    )
  }

  if (searchType === 'genre') {
    matched = data.filter((item) => {
      return item.genres
        .join(' ')
        .toLowerCase()
        .split(' ')
        .includes(searchInput)
    })
  }

  const compareByDate = (a: any, b: any) => {
    if (+b.release_date.slice(0, 4) < +a.release_date.slice(0, 4)) {
      return -1
    }
    if (+b.release_date.slice(0, 4) > +a.release_date.slice(0, 4)) {
      return 1
    }
    return 0
  }

  const compareByRating = (a: any, b: any) => {
    if (b.vote_average < a.vote_average) {
      return -1
    }
    if (b.vote_average > a.vote_average) {
      return 1
    }
    return 0
  }

  return matched?.sort(
    filterOption === 'rating' ? compareByRating : compareByDate
  )
}

const findMovie = (movieID: number, movies: Array<Movie>) => {
  if(typeof movieID !== 'number') return 
  if(!Array.isArray(movies)) return
  if(movies.length < 1) return

  return movies.find(({id}) => id === movieID)
}

export { getGenreOutput, matchedMovies, findMovie }
