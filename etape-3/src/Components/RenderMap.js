import React, { Component } from 'react';
import { connect } from 'react-redux';
import { API_KEY } from '../api_key';
import MapOptions from './Containers/MapOptions';
import { updateUserPosition } from '../actions';
import { withScriptjs, withGoogleMap } from 'react-google-maps';

class RenderMap extends Component {
   componentWillMount() {
      this.getCurrentLocation();
   }

   // if userPosition !== old UserPosition
   // ⟶ rerender the comp. to re-center the map on the user position.
   shouldComponentUpdate(nextProps) {
      return this.props.userPosition !== nextProps.userPosition;
   }

   getCurrentLocation() {
      if (window.navigator && window.navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            pos => {
               //user accept access
               const { latitude, longitude } = pos.coords;
               const coords = {
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude)
               };
               this.props.updateUserPosition(coords);
            },
            error => {
               if (error.code === 1) {
                  //user denied access
                  alert(
                     "Vous n'avez pas autoriser la géolocalisation. Vous serez donc géolocalisé, par défaut, à Paris"
                  );
               }
               this.props.updateUserPosition({ lat: 48.866667, lng: 2.333333 });
            }
         );
      } else {
         // not avaliable
         alert(
            "La position n'est pas supportée ou a été desactivée. Vous serez donc localiser, par défaut, à Paris."
         );
         this.props.updateUserPosition({ lat: 48.866667, lng: 2.333333 });
      }
   }

   render() {
      const WrappedMap = withScriptjs(withGoogleMap(() => <MapOptions />));

      return (
         <div className="col-sm-12 col-lg-9" style={{ height: '50%' }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?3.40.explibraries=geometry,drawing,places&key=${API_KEY}`}
               loadingElement={<div style={{ height: `80%` }} />}
               containerElement={<div style={{ height: `80vh` }} />}
               mapElement={<div style={{ height: `80vh` }} />}
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
