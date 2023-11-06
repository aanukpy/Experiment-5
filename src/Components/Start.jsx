import React from 'react';
import './Start.css'
const Start = ({onStartClick}) => {
    return (
        <div className='start'>
            <button type="button" class="btn btn-outline-info btn-start" onClick={onStartClick}>Start</button>
        </div>
    );
}

export default Start;
