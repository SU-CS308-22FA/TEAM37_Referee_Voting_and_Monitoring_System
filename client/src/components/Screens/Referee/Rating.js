import React from 'react';

const Rating = ({rating}) => {
    
    return (
        <>
            {rating>=4.5? <div>
          <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
            </div> : rating>=4?
            <div>
            <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />

        </div>
        :   rating>=3?
        <div>
        <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
          
    </div>: rating>=2?
            <div>
            <img src="/star.png" alt="" />
          <img src="/star.png" alt="" />
          



        </div> :  <div>
        
        <img src="star.png" alt="" />
          

        </div>}
        </>
    );
};

export default Rating;