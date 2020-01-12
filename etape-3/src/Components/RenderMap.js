import React, { Component } from "react";
import { connect } from "react-redux";
import { API_KEY } from "../api_key";
import MapOptions from "./Containers/MapOptions";
import { updateUserPosition } from "../actions";
import { withScriptjs, withGoogleMap } from "react-google-maps";

class RenderMap extends Component {
   componentWillMount() {
      this.getCurrentLocation();
   }

   // re render to re - center the map on the user position !
   shouldComponentUpdate(nextProps) {
      return this.props.userPosition !== nextProps.userPosition;
   }

   getCurrentLocation() {
      if (window.navigator && window.navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            pos => {
               const { latitude, longitude } = pos.coords;
               const coords = {
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude)
               };
               this.props.updateUserPosition(coords);
            },
            error => {
               console.log(error);
               this.props.updateUserPosition({ lat: 48.866667, lng: 2.333333 });
            }
         );
      } else {
         alert('La position n\'est pas supportée ou est desactivée par votre navigateur. Vous serez donc localiser, par défaut, à Paris.')
         this.props.updateUserPosition({ lat: 48.866667, lng: 2.333333 });
      }
   }

   render() {
      const WrappedMap = withScriptjs(withGoogleMap(() => <MapOptions />));

      return (
         <div className="col-sm-12 col-lg-9" style={{ height: "50%" }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?3.40.explibraries=geometry,drawing,places&key=${API_KEY}`}
               loadingElement={<div style={{ height: `100%` }} />}
               containerElement={<div style={{ height: `700px` }} />}
               mapElement={<div style={{ height: `100%` }} />}
            />
         </div>
      );
   }
}

const mapDispatchToProps = {
   updateUserPosition
};

const mapStateToProps = store => ({
   userPosition: store.userPosition
});

export default connect(mapStateToProps, mapDispatchToProps)(RenderMap);
