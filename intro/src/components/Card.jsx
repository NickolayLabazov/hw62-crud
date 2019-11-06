import React from 'react';

export default function Card(props) {
    //console.log(props)
    //className = 'card-remove'
    return (
        <div className='card-card'>
            <p>{props.card.content}</p>
            <div
                className='card-remove update'
                onClick={() => props.removeCard(props.card.id)}
            >&#x2716;</div>
        </div>
    );
}