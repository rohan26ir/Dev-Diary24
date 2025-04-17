import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import ReactDOMServer from 'react-dom/server';

const iconHTML = ReactDOMServer.renderToString(
  <FaMapMarkerAlt style={{ color: 'red', fontSize: '24px' }} />
);

const customIcon = new L.DivIcon({
  html: iconHTML,
  className: '', // removes default styles
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const ContactLocation = () => {
  return (
    <div className='h-[390px] w-[90%] lg:w-[80%] pb-6 mx-auto' >
      <MapContainer
        center={[23.6850, 90.3563]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[23.8103, 90.4125]} icon={customIcon}>
          <Popup>
            <strong>Dhaka, Bangladesh</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default ContactLocation;
