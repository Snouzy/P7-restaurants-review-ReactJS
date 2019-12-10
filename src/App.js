import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Map from "./Components/Map";
import Infos from "./Components/Infos";

function App() {
   return (
      <div>
         <Header />
         <div className="container-fluid">
            <div className="row">
               <Map />
               <Infos />
            </div>
         </div>
      </div>
   );
}

export default App;
