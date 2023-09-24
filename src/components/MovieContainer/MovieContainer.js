import React, { useState, useEffect } from 'react';
import MovieRow from '../MovieRow/MovieRow';
import ModalCard from '../ModalCard/ModalCard';
import Loader from '../Loader/Loader';
import './MovieContainer.css';

function MovieContainer() {
    const movieTypes = ['Batman', 'Avengers', 'Superman'];
    const [data, setData] = useState('');
    const [isError, setIsError] = useState(false);
    const [isMovies, setIsMovies] = useState(true);
    const [selectedType, setSelectedType] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(0);
    const [isModal, setIsModal] = useState(false);
    const [isLoad, setIsLoad] = useState(true);
    var movieLength;

    // * Hvatanje podataka
    useEffect(() => {
        window.addEventListener('keydown', handleArrows);

        const fetchData = async () => {
            setIsLoad(true);

            // * Pravimo arej promisa kako bismo imali onoliko promisa koliko imamo tipova filmova (moviesTypes)
            const moviePromises = movieTypes.map(type => {
                const apiUrl = `https://www.omdbapi.com/?apikey=22815cc3&s=${type}`;
                return fetch(apiUrl)
                    .then(response => {
                        if (!response.ok) return setIsError(true);
                        setIsError(false);
                        return response.json();
                    })
                    .catch(err => {
                        setIsError(true);
                        console.log(err, 'greska');
                    })
            });

            // * Hvatamo rezlutate svim promisa uz pomoc Promise.all() i smestamo ih u setData()
            try {
                const movieResults = await Promise.all(moviePromises);
                if (movieResults.length > 0) {
                    setIsMovies(true);
                    setData(movieResults);
                    movieLength = movieResults[0].Search.length;
                } else {
                    setIsMovies(false);
                }
            } catch (error) {
                console.error(error, 'GRESKA');
            } finally {
                setIsLoad(false);
            }
        }
        fetchData();
    }, [])

    // * Event handler
    const handleArrows = (e) => {
        switch (e.code) {
            case 'ArrowDown':
                arrowNavigation('down');
                break;
            case 'ArrowUp':
                arrowNavigation('up');
                break;
            case 'ArrowLeft':
                arrowNavigation('left');
                break;
            case 'ArrowRight':
                arrowNavigation('right');
                break;
            case 'Enter':
                setIsModal(true);
                break;
            case 'Backspace':
            case 'Escape':
                setIsModal(false);
                break;
            default:
                break;
        }
    }

    // * Logika za navigaciju strelicama
    const arrowNavigation = (key) => {
        if (key === 'down' || key === 'up') {

            // * Menjamo selectedType (row) state ako korisnik menja row
            setSelectedType((prev) => {
                if (key === 'down' && prev < movieTypes.length - 1 && prev !== null) return prev + 1;
                if (key === 'up' && prev > 0 && prev !== null) return prev - 1;
                return prev;
            })
        } else if (key === 'left' || key === 'right') {
            
            // * Menjamo selectedMovie (film) state ako korisnik menja film u istom rowu
            setSelectedMovie((prev) => {
                if (key === 'right' && prev < movieLength - 1 && prev !== null) return prev + 1;
                if (key === 'left' && prev > 0 && prev !== null) return prev - 1;
                return prev;
            })
        }
    }

    // * Display rows function
    const displayMovies = () => {
        return data.map((type, index) => {
            return <MovieRow
                key={index}
                rowIndex={index}
                movies={type.Search}
                setIsModal={setIsModal}
                selectedType={selectedType}
                selectedMovie={selectedMovie}
                setSelectedType={setSelectedType}
                setSelectedMovie={setSelectedMovie} />
        })
    }

    return (
        <>
            {
                data ?
                    <div className="movie-container">
                        {displayMovies()}
                    </div> :
                    null
            }

            {
                isModal ?
                    <ModalCard
                        data={data}
                        selectedType={selectedType}
                        selectedMovie={selectedMovie} /> :
                    null
            }

            {isLoad ? <Loader /> : null}

            {/* // * Izbacujemo klijentu ako dodje do gresaka prilikom hvatanja podataka ili ako nema podataka */}
            {isError ? <h1>GRESKA NA SERVERU</h1> : null}
            {!isMovies ? <h1>NEMA FILMOVA</h1> : null}
        </>
    )
}

export default MovieContainer
