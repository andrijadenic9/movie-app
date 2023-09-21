import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

function MovieRow({ movies, rowIndex, selectedType, selectedMovie }) {
    return (
        <>
            <div className='movie-row'>
                    {
                        movies.map((movie, index) => {
                            return <MovieCard
                                key={index}
                                movie={movie}
                                rowIndex={rowIndex}
                                cardIndex={index}
                                selectedType={selectedType}
                                selectedMovie={selectedMovie}
                            />
                        })
                    }
            </div>
        </>
    )
}

export default MovieRow
