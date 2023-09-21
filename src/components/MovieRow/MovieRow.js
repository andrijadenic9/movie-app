import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

function MovieRow({ movies, rowIndex, selectedType, selectedMovie, setSelectedType, setSelectedMovie, setIsModal }) {
    return (
        <>
            <div className='movie-row'>
                {
                    movies.map((movie, index) => {
                        return <MovieCard
                            key={index}
                            movie={movie}
                            cardIndex={index}
                            rowIndex={rowIndex}
                            setIsModal={setIsModal}
                            selectedType={selectedType}
                            selectedMovie={selectedMovie}
                            setSelectedType={setSelectedType}
                            setSelectedMovie={setSelectedMovie}
                        />
                    })
                }
            </div>
        </>
    )
}

export default MovieRow
