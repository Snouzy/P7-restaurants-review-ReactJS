import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Map from "./Components/Map";
import { Restaurants } from "./Components/Restaurants";

function App() {
   return (
      <div>
         <Header />
         <div className="container-fluid">
            <div className="row">
               <Map />
               <Restaurants />
            </div>
         </div>
      </div>
   );
}

export default App;
