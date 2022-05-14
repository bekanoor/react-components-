import {
  fetchDataByGenre,
  fetchDataById,
  fetchMovies,
  fetchMoviesBySearchType,
} from '../../utils/'
import {
  finishSetMovies,
  finishSetSameGenreMovies,
  setSelectedMovie,
} from '../actions'
import {
  MAIN_PAGE_ERROR,
  VIEW_PAGE_HEAD_ERROR,
  VIEW_PAGE_MAIN_ERROR,
} from '../constants'

import { call, put, takeEvery } from 'redux-saga/effects'
import { Movie } from 'src/models'

type HandleMoviesType = {
  type: string
  payload: ['query', 'searchBy', 'filterBy']
}

export function* handleMovies(action: HandleMoviesType) {
  if (action?.payload === undefined) {
    const data: Array<Movie> = yield call(fetchMovies)

    yield put(finishSetMovies(data))
  } else {
    const [query, searchBy, filterBy] = action.payload
    const data: Array<Movie> = yield call(
      fetchMoviesBySearchType,
      query,
      searchBy,
      filterBy
    )

    if (!data.length) {
      yield put({
        type: MAIN_PAGE_ERROR,
        payload: 'Error fetching movies by params',
      })
      yield put(finishSetMovies([]))
      return
    }

    yield put(finishSetMovies(data))
  }
}

type HandleTransitionFromMainPage = {
  type: string
  payload: string
}

export function* handleTransitionFromMainPage(
  action: HandleTransitionFromMainPage
) {
  const data: Array<Movie> = yield call(fetchDataByGenre, action.payload)

  yield put(finishSetSameGenreMovies(data))
}

type ActionType = {
  type: string
  payload: string
}

export function* handleViewPageHeader(action: ActionType) {
  try {
    const movie: Movie = yield call(fetchDataById, action.payload)

    yield put(setSelectedMovie([movie]))
  } catch (err) {
    yield put({
      type: VIEW_PAGE_HEAD_ERROR,
      payload: 'Error fetching movie information',
    })
  }
}

export function* handleViewPageMain(action: ActionType) {
  try {
    const movie: Movie = yield call(fetchDataById, action.payload)
    const { genres } = movie
    const [genre] = genres

    const sameGenreMovies: Array<Movie> = yield call(fetchDataByGenre, genre)

    yield put(finishSetSameGenreMovies(sameGenreMovies))
  } catch (err) {
    yield put({
      type: VIEW_PAGE_HEAD_ERROR,
      payload: 'Error fetching same genre movies',
    })
  }
}

export function* watchSaga() {
  yield takeEvery('START_SET_MOVIES', handleMovies)
  yield takeEvery('START_SET_SAME_GENRE_MOVIES', handleTransitionFromMainPage)
  yield takeEvery('SET_NEW_TAB_MOVIE', handleViewPageHeader)
  yield takeEvery('SET_NEW_TAB_MOVIE', handleViewPageMain)
}

export function* rootSaga() {
  yield watchSaga()
}
