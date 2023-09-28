// src/components/MovieRow.js
import React, { useState, useEffect, useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';

const MovieRow = ({ movies }) => {
    const [focusedIndex, setFocusedIndex] = useState(0);
    const rowRef = useRef(null);

    useEffect(() => {
        // Dodajte event listener za tastaturu kako biste pratili strelice
        const handleKeyPress = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    // Pomaknite fokus na prethodni red (row)
                    // Ovo pretpostavlja da imate četiri reda u App komponenti.
                    // Ako imate dinamički broj redova, prilagodite logiku.
                    setFocusedIndex(0);
                    break;
                case 'ArrowDown':
                    // Pomaknite fokus na sledeći red (row)
                    setFocusedIndex(0);
                    break;
                case 'ArrowLeft':
                    // Pomaknite fokus na prethodni film
                    setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
                    break;
                case 'ArrowRight':
                    // Pomaknite fokus na sledeći film
                    setFocusedIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1));
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [movies]);

    useEffect(() => {
        // Ako je film u fokusu van vidnog polja, pomerite red tako da je film u centru view-a
        if (rowRef.current) {
            const focusedElement = rowRef.current.children[focusedIndex];
            if (focusedElement) {
                focusedElement.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center', // Pomera fokusirani film u centar view-a
                });
            }
        }
    }, [focusedIndex]);

    return (
        <>
            <div className="movie-row" ref={rowRef}>
                {movies.map((movie, index) => (
                    <div
                        key={index}
                        className={`movie-item ${focusedIndex === index ? 'focused' : ''}`}
                    >

                        <MovieCard
                            movie={movie}
                            // rowIndex={rowIndex}
                            // cardIndex={cardIndex}
                            // selectedType={selectedType}
                            // selectedMovie={selectedMovie}
                            // setIsModal={setIsModal}
                        />
                    </div>
                ))}
            </div>
            {console.log(movies, 'movies')}
        </>
    );
};

export default MovieRow;
