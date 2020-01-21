import React, { Component } from 'react';
import { API_KEY } from '../../api_key';
import { MapOptions } from './MapOptions';

import { withScriptjs, withGoogleMap } from 'react-google-maps';
class RenderMap extends Component {
   constructor(props) {
      super(props);
      this.state = {
         coords: {
            lat: 48.866667,
            lng: 2.333333
         }
      };
   }

   componentDidMount() {
      this.getCurrentLocation();
   }

   getCurrentLocation() {
      if (window.navigator && window.navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            pos => {
               const { latitude, longitude } = pos.coords;
               console.log('latitude :', latitude, 'longitude :', longitude);
               const coords = {
                  lat: parseFloat(latitude),
                  lng: parseFloat(longitude)
               };
               this.setState({ coords });
            },
            error => {
               if (error.code === 1) {
                  alert(
                     "Vous n'avez pas autoriser la géolocalisation. Vous serez donc géolocalisé, par défaut, à Paris."
                  );
               }
            }
         );
      } else {
         alert(
            "La position n'est pas supportée ou a été desactivée par votre navigateur... Vous serez donc géolocalisé, par défaut, à Paris"
         );
      }
   }

   render() {
      const WrappedMap = withScriptjs(
         withGoogleMap(() => (
            <MapOptions
               coords={this.state.coords}
               restaurants={this.props.restaurants}
               minimum={this.props.minimum}
               maximum={this.props.maximum}
               hasFiltered={this.props.handleFilter}
            />
         ))
      );

      return (
         <div className="col-sm-12 col-lg-9" style={{ height: '50%' }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?3.40.explibraries=geometry,drawing,places&key=${API_KEY}`}
               loadingElement={<div style={{ height: `50%` }} />}
               containerElement={<div style={{ height: `700px` }} />}
               mapElement={<div style={{ height: `100%` }} />}
            />
         </div>
      );
   }
}

export default RenderMap;
