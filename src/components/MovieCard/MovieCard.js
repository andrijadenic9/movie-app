import { useRef } from 'react';
import './MovieCard.css';

function MovieCard({ movie, rowIndex, cardIndex, selectedType, selectedMovie, setIsModal }) {
    const card = useRef();

    // * Obelezavamo movie card tako sto postavljamo klasu u zavisnosti da li se korisnik nalazi na njoj
    const handleClass = () => {
        if (cardIndex === selectedMovie && rowIndex === selectedType) return 'selected-card';
        return '';
    }

    return (
        <div
            ref={card}
            tabIndex='0'
            onClick={() => setIsModal(true)}
            className={`movie-card ${handleClass()}`}
            style={{ backgroundImage: `url(${movie.Poster})` }}
        ></div>
    )
}

export default MovieCard