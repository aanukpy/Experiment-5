import React from 'react';
import './Input.css'

const Inputbox = ({ onSubmit }) => {
    const handleSubmit = () => {
     
      onSubmit();
    };
    return (<>
<div className='contract'>

</div>
        <div className='inputbox'>
            
            <div className="money-input-container">
      <input
        type="text"
        placeholder="Enter the money"
        className="money-input"
      />
      <button className="submit-button"onClick={handleSubmit}>Send</button>
    </div>
        </div>
        </>
    );
}

export default Inputbox;