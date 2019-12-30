import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import RenderMap from "./Components/Map/RenderMap";
import Restaurants from "./Components/Restaurants";
import RestaurantRedux from "./Components/RestaurantsRedux";

const App = () => {
   return (
      <div>
         <Header />
         <div className="container-fluid">
            <div className="row">
               <RestaurantRedux />
               <RenderMap />
               <Restaurants />
            </div>
         </div>
      </div>
   );
};

export default App;
