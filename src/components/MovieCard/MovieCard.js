import './MovieCard.css';

function MovieCard({ movie, rowIndex, cardIndex, selectedType, selectedMovie }) {

    // * Obelezavamo movie card tako sto postavljamo klasu u zavisnosti da li se korisnik nalazi na njoj
    const handleClass = () => {
        if (cardIndex === selectedMovie && rowIndex === selectedType) return 'selected-card';
        return '';
    }

    return (
        <>
            <div
                key={movie.imdbID}
                className={`movie-card ${handleClass()}`}
                style={{ backgroundImage: `url(${movie.Poster})` }}>
            </div>
        </>
    )
}

export default MovieCard
