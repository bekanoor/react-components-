import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FilmCard } from './FilmCard'

describe('test film card', () => {
  test('should render film card correctly', () => {
    const { container } = render(
      <FilmCard
        cover=''
        filmTitle=''
        releaseDate='2018'
        genre=''
        id={0}
        onChangePage={() => {}}
      />
    )

    expect(container).toMatchSnapshot()
  })

  test('dom elements really exist', () => {
    render(
      <FilmCard
        cover=''
        filmTitle=''
        releaseDate='2018'
        genre=''
        id={0}
        onChangePage={() => {}}
      />
    )

    const card = screen.getByTestId('film-card-test')
    expect(card).toBeInTheDocument
  })
})
