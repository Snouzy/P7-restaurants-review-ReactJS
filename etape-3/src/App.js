import React from "react";
import "./App.css";
import Header from "./Components/Headers/Header";
import RenderMap from "./Components/RenderMap";
import Restaurants from "./Components/Containers/Restaurants";

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
