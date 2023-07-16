import "./styles/App.css";
import "leaflet/dist/leaflet.css";
import React, { useState, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Markers, SideBar } from "./components";

import { v4 as uuidv4 } from "uuid";

function App() {
  const mapRef = useRef();
  const [markers, setMarkers] = useState([]);
  const [saved, setSaved] = useState(false);

  const position = [5.286051, -3.977534];
  const zoom = 13;
  const scrollWheelZoom = true;

  const addDefaultMarker = () => {
    let id = uuidv4();
    const { lat, lng } = mapRef.current.getCenter();
    setMarkers([...markers, { id, lat, lng }]);
  };

  const addMarker = (lat, lng) => {
    let id = uuidv4();
    setMarkers([...markers, { id, lat, lng }]);
  };

  const removeMarker = (id) => {
    if (!saved) {
      setMarkers((pv) => pv.filter((mrk) => mrk.id !== id));
    }
  };

  const updateMarkerPosition = (id, lat, lng) => {
    let updatedList = markers.map((mrk) => {
      if (mrk.id === id) {
        mrk.lat = lat;
        mrk.lng = lng;
      }

      return mrk;
    });
    setMarkers(updatedList);
  };

  const save = () => {
    setSaved(true);
  };

  const unsave = () => {
    setSaved(false);
  };

  return (
    <div className="App">
      <MapContainer
        ref={mapRef}
        center={position}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        className="map_container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Markers
          saved={saved}
          markers={markers}
          addMarker={addMarker}
          removeMarker={removeMarker}
          updateMarkerPosition={updateMarkerPosition}
        />
      </MapContainer>
      <SideBar
        saved={saved}
        save={save}
        unsave={unsave}
        add={addDefaultMarker}
        markersList={markers}
      />
    </div>
  );
}

export default App;
