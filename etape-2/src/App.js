import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import RenderMap from "./Components/Map/RenderMap";
import { Restaurants } from "./Components/Restaurants";

const App = () => {
   return (
      <div>
         <Header />
         <div className="container-fluid">
            <div className="row">
               <RenderMap />
               <Restaurants />
            </div>
         </div>
      </div>
   );
};

export default App;
