import { useRef } from 'react';
import './MovieCard.css';

function MovieCard({ movie, rowIndex, cardIndex, selectedType, selectedMovie, setSelectedType, setSelectedMovie, setIsModal }) {
    const card = useRef();

    // * Obelezavamo movie card tako sto postavljamo klasu u zavisnosti da li se korisnik nalazi na njoj
    const handleClass = () => {
        if (cardIndex === selectedMovie && rowIndex === selectedType) return 'selected-card';
        return '';
    }

    const cardHovered = () => {
        setSelectedType(rowIndex);
        setSelectedMovie(cardIndex);
        card.current.classList.add('selected-card');
    }

    const cardUnHovered = () => {
        card.current.classList.remove('selected-card');
    }

    return (
        <>
            <div
                ref={card}
                onClick={() => setIsModal(true)}
                onMouseEnter={() => cardHovered()}
                onMouseLeave={() => cardUnHovered()}
                key={movie.imdbID}
                className={`movie-card ${handleClass()}`}
                style={{ backgroundImage: `url(${movie.Poster})` }}>
            </div>
        </>
    )
}

export default MovieCard
