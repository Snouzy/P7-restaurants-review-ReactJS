import React from 'react';
import styled from 'styled-components';
import { filterRestaurants, commentsFlag } from '../../actions';
import { connect } from 'react-redux';
import Stars from '../Common/Stars';
import Filter from '../Common/Filter';
import { averageStars } from '../../services/libs';

const Restaurants = props => {
   const {
      restaurants,
      restaurantsFiltered,
      commentsFlag,
      filterRestaurants
   } = props; //from redux
   const [minimum, setMinimum] = React.useState(0); // min filter = 1
   const [maximum, setMaximum] = React.useState(5); // max filter = 5

   // setting the min & max into the state when a user change the values of the options
   const handleFilter = e => {
      if (e.target.name === 'sort-max') {
         setMaximum(parseInt(e.target.value));
         setMinimum(parseInt(document.getElementsByName('sort-min')[0].value));
      } else {
         setMinimum(parseInt(e.target.value));
         setMaximum(document.getElementsByName('sort-max')[0].value);
      }
   };

   // when the user filter the restaurants, return all the wanted restaurants
   React.useEffect(() => {
      //look all the defaults restaurants
      const restos = restaurants.filter(resto => {
         let restaurantStars;

         //because some of these don't have any rating
         if (resto.ratings) {
            restaurantStars = averageStars(resto.ratings);
         }

         // fix the problem when a user add a restaurant, because he has no ratings yet, give him a default ratings average value
         if (isNaN(restaurantStars)) {
            restaurantStars = 0;
         }
         //return all the restaurants between the filter
         return restaurantStars >= minimum && restaurantStars <= maximum;
      });
      // console.log(restos);
      // pushing ones which correspond to the filter into the store
      filterRestaurants(restos);
   }, [minimum, maximum, restaurants, commentsFlag, filterRestaurants]); //changing when filter change or the restaurants store change

   return (
      <>
         <DivRestaurants className="row col-sm-12 col-lg-3">
            <Filter
               changed={e => handleFilter(e)}
               maxStars={maximum}
               numberOfOptions={5}
            />

            <div className="col-sm-12">
               {/* mapping the redux store and display the restaurant */}
               {restaurantsFiltered && restaurantsFiltered.length ? (
                  restaurantsFiltered.map(
                     ({ restaurantName, address, ratings }, index) => {
                        return (
                           <div key={index}>
                              <h5>{restaurantName}</h5>
                              <p style={{ marginBottom: '0' }}>{address}</p>
                              <Stars
                                 numberOfStars={
                                    ratings && averageStars(ratings)
                                 }
                                 isEditable={false}
                                 size={25}
                              />
                              <hr />
                           </div>
                        );
                     }
                  )
               ) : (
                  <p>Aucun restaurant ne correspond aux critères choisis !</p>
               )}
            </div>
         </DivRestaurants>
      </>
   );
};

//read the store
const mapStateToProps = store => ({
   restaurants: store.restoReducer,
   restaurantsFiltered: store.restoFilter.newRestaurants,
   commentsFlag: store.commentsFlag
});

//push-modify the store
const mapDipatchToProps = {
   filterRestaurants,
   commentsFlag
};
export default connect(mapStateToProps, mapDipatchToProps)(Restaurants);

const DivRestaurants = styled.div`
   height: 80vh;
   overflow-y: scroll;
`;
