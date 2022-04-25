import { actionType, Movie, stateTypes } from 'src/models'

const defaultState: stateTypes = {
  searchType: 'title',
  filterType: 'rating',
  searchInput: '',
  searchButton: 'disable',
  data: {
    data: [],
  },
  isLoading: true,
  selectedMovie: [],
  sameGenreMovies: [], 
}

export const reducer = (
  state: stateTypes = defaultState,
  action: actionType
) => {
  switch (action.type) {
    case 'SET_SEARCH_TYPE':
      return { ...state, searchType: action.payload }
    case 'SET_FILTER_TYPE':
      return { ...state, filterType: action.payload }
    case 'SET_SEARCH_INPUT':
      return { ...state, searchInput: action.payload }
    case 'SET_SEARCH_BUTTON':
      return { ...state, searchButton: action.payload }
    case 'SET_DATA':
      return { ...state, data: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_SELECTED_MOVIE_ID':
      return {...state, selectedMovie: action.payload}
    case 'SET_SAME_GENRE_MOVIES':
      return {...state, sameGenreMovies: action.payload}
    default:
      return state
  }
}

export const setSearchType = (value: string) => {
  return { type: 'SET_SEARCH_TYPE', payload: value }
}

export const setFilterType = (value: string) => {
  return { type: 'SET_FILTER_TYPE', payload: value }
}

export const setSearchInput = (value: string) => {
  return { type: 'SET_SEARCH_INPUT', payload: value }
}

export const setSearchButton = (value: string) => {
  return { type: 'SET_SEARCH_BUTTON', payload: value }
}

export const setData = (data: any) => {
  return { type: 'SET_DATA', payload: data }
}

export const setLoading = (status: boolean) => {
  return { type: 'SET_LOADING', payload: status }
}

export const setSelectedMovie = (value: Array<Movie>) => {
  return { type: 'SET_SELECTED_MOVIE_ID', payload: value}
}

export const setSameGenreMovies = (value: Array<Movie>) => {
  return { type: 'SET_SAME_GENRE_MOVIES', payload: value}
}
