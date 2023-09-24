import { useEffect, useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

function MovieRow({ movies, rowIndex, selectedType, selectedMovie, setSelectedType, setSelectedMovie, setIsModal }) {
    const rowElement = useRef();

    useEffect(() => {
        const handleScroll = (e) => {
            if (rowElement.current) {
                rowElement.current.scrollLeft += e.deltaY;
            }
        };
        window.addEventListener('keydown', changeRow);
        rowElement.current.addEventListener('wheel', handleScroll);

    }, [selectedType])

    // * Osiguravamo da bude fokusiran samo onaj row koji zelimo da pomeramo
    const changeRow = () => {
        if (selectedType === parseInt(rowElement.current.id)) {
            rowElement.current.focus();
        }
    }

    // * Navigacija strelicama pomeranje za odredjeni width
    const handleKeyDown = (e) => {
        const row = rowElement.current;
        const card = rowElement.current.children[selectedMovie];
        const cardLeft = card.offsetLeft;

        switch (e.code) {
            case 'ArrowLeft':
                row.scrollLeft = cardLeft - row.clientWidth / 2 + card.offsetWidth / 2;
                break;
            case 'ArrowRight':
                row.scrollLeft = cardLeft - card.offsetWidth;
                break;
            default:
                break;
        }
    };

    return (
        <div
            ref={rowElement}
            id={rowIndex}
            className='movie-row'
            onKeyDown={handleKeyDown}
            tabIndex={selectedType === rowIndex ? '0' : '-1'}
            style={{ overflowX: selectedType === rowIndex ? 'auto' : 'hidden' }}
        >
            {movies.map((movie, index) => (
                <MovieCard
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
            ))}
        </div>
    );
}

export default MovieRow;
