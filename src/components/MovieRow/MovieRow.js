import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieRow.css';

function MovieRow({ movies, rowIndex, selectedType, selectedMovie, setSelectedType, setSelectedMovie, setIsModal, container }) {
    const rowElement = useRef();

    // * SCROLL NA TOCKIC MISA
    // useEffect(() => {
    //     const handleScroll = (e) => {
    //         if (rowElement.current) {
    //             rowElement.current.scrollLeft += e.deltaY;
    //         }
    //     };
    //     rowElement.current.addEventListener('wheel', handleScroll);

    // }, [selectedType])

    // const scrollToElement = (e) => {
    //     if (selectedType === parseInt(rowElement.current.id))
    //         console.log(rowElement, 'rowElement')
    //     switch (e.code) {
    //         case 'ArrowDown':
    //             rowElement.current.scrollIntoView({ behavior: 'smooth' });
    //             console.log('USAO U DOWN')
    //             break;
    //         case 'ArrowUp':
    //             rowElement.current.scrollIntoView({ behavior: 'smooth' });
    //             console.log('USAO U UP')
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener('keydown', scrollToElement);

    // }, [selectedType])

    useEffect(() => {

        // * Ako je film u fokusu van vidnog polja, pomeram red tako da je film u centru view-a
        if (selectedType === parseInt(rowElement.current.id)) {
            const focusedElement = rowElement.current.children[selectedMovie];
            if (focusedElement) {
                const rowWidth = rowElement.current.offsetWidth;
                const elementWidth = focusedElement.offsetWidth;
                const elementLeft = focusedElement.offsetLeft;
                const scrollOffsetX = elementLeft + elementWidth / 2 - rowWidth / 2;
                rowElement.current.scrollLeft = scrollOffsetX; // ovde je postavljeno skrol za X osu

                const rowHeight = rowElement.current.offsetHeight;
                const elementHeight = focusedElement.offsetHeight;
                const elementTop = focusedElement.offsetTop;
                const scrollOffsetY = elementTop + elementHeight / 2 - rowHeight / 2;
                // rowElement.current.scrollTop = scrollOffsetY; // ! scrollTop problem

                // window.scrollTo({
                //     top: scrollOffsetY,
                //     behavior: 'smooth',
                // });

                // * ovo je za sada najblize, na strelice levo i desno skroluje po Y osi na sredinu
                // rowElement.current.scrollIntoView(true)
                rowElement.current.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'end',
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
                // tabIndex='0'
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
            {/* {console.log(selectedType, 'selectedType')} */}
        </>
    );
}

export default MovieRow;
