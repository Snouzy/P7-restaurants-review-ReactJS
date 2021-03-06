import React from 'react';
import data from '../data.json';
import Stars from './Common/Stars';
import { averageStars } from '../services/libs';
import Filter from './Common/Filter';
export const Restaurants = ({ maximum, hasFiltered, restaurants }) => {
   return (
      <div className="row col-sm-12 col-lg-3">
         <Filter changed={hasFiltered} maxStars={maximum} numberOfOptions={5} />
         <div id="restaux" className="col-sm-12">
            {restaurants.map((resto, index) => (
               <div key={index}>
                  <h5>{resto.restaurantName}</h5>
                  <p style={{ marginBottom: '0' }}>{resto.address}</p>
                  <Stars
                     numberOfStars={averageStars(resto.ratings)}
                     isEditable={false}
                     size={25}
                  />
                  <hr />
               </div>
            ))}
         </div>
      </div>
   );
};
