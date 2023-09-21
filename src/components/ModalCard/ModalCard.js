import React from 'react';
import './ModalCard.css';

function ModalCard({ data, selectedType, selectedMovie }) {
    return (
        <>
            <div className="modal-card-wrapper">
                <div
                    className="modal-card"
                    style={{ backgroundImage: `url(${data[selectedType].Search[selectedMovie].Poster})` }}>
                    <span className='type'>{data[selectedType].Search[selectedMovie].Type}</span>
                    <span className='imdb'>{data[selectedType].Search[selectedMovie].imdbID}</span>
                    <div className="content">
                        <div className="heading">
                            <h2>{data[selectedType].Search[selectedMovie].Title}</h2>
                            <span>{data[selectedType].Search[selectedMovie].Year}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalCard
