import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

function MovieRow({ movies, rowIndex, selectedType, selectedMovie, setSelectedType, setSelectedMovie, setIsModal }) {
    const rowElement = useRef();

    // * OTKOMENTARISATI ZA Scroll po X osi na mouse wheel
    // useEffect(() => {
    //     const handleScroll = (e) => {
    //         if (rowElement.current) {
    //             rowElement.current.scrollLeft += e.deltaY;
    //         }
    //     };
    //     rowElement.current.addEventListener('wheel', handleScroll);

    // }, [selectedType])

    // * Ako je film u fokusu van vidnog polja, pomeram red tako da je film u centru view-a
    useEffect(() => {
        if (selectedType === parseInt(rowElement.current.id)) {
            const focusedElement = rowElement.current.children[selectedMovie];
            if (focusedElement) {
                // * Ovde je postavljen skrol za X osu
                const rowWidth = rowElement.current.offsetWidth;
                const elementWidth = focusedElement.offsetWidth;
                const elementLeft = focusedElement.offsetLeft;
                const scrollOffsetX = elementLeft + elementWidth / 2 - rowWidth / 2;
                rowElement.current.scrollLeft = scrollOffsetX;

                // * Scrol za Y osu zakomentarisan jer sam zamislio da tako radi, medjutim nije ---->
                // const rowHeight = rowElement.current.offsetHeight;
                // const elementHeight = focusedElement.offsetHeight;
                // const elementTop = focusedElement.offsetTop;
                // const scrollOffsetY = elementTop + elementHeight / 2 - rowHeight / 2;

                // * S obzirom da ova linija ne radi, morao sam da koristim buildin metodu scrollIntoView za scrol po Y osi, ispod --->
                // rowElement.current.scrollTop = scrollOffsetY; // ! scrollTop problem

                // * Ovde je postavljen scrol za Y osu
                rowElement.current.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                    block: 'center'
                })
            }
        }
    }, [selectedType, selectedMovie]);

    return (
        <>
            <div
                id={rowIndex}
                ref={rowElement}
                className='movie-row'
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
        </>
    );
}

export default MovieRow;
