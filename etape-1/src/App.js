import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import RenderMap from './Components/Map/RenderMap';
import { Restaurants } from './Components/Restaurants';
import data from './data.json';
import { averageStars } from './services/libs';
function App() {
   const [restaurants, setRestaurants] = React.useState(data);
   const [minimum, setMinimum] = React.useState(null);
   const [maximum, setMaximum] = React.useState(5); //initializing the ratings to 5 stars max

   const handleFilter = e => {
      if (e.target.name === 'sort-max') {
         setMaximum(parseInt(e.target.value));
         setMinimum(parseInt(document.getElementsByName('sort-min')[0].value));
      } else {
         setMinimum(parseInt(e.target.value));
         setMaximum(document.getElementsByName('sort-max')[0].value);
      }
   };

   React.useEffect(() => {
      const restos = data.filter(
         resto =>
            averageStars(resto.ratings) >= minimum &&
            averageStars(resto.ratings) <= maximum
      );
      setRestaurants(restos); //updating the state with new values
   }, [minimum, maximum]);

   return (
      <div>
         <Header />
         <div className="container-fluid">
            <div className="row">
               <RenderMap
                  restaurants={restaurants}
                  minimum={minimum}
                  maximum={maximum}
                  hasFiltered={handleFilter}
               />
               <Restaurants
                  restaurants={restaurants}
                  minimum={minimum}
                  maximum={maximum}
                  hasFiltered={handleFilter}
               />
            </div>
         </div>
      </div>
   );
}

export default App;
