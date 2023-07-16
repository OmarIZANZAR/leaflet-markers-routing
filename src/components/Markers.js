import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import React, { useState, useEffect } from "react";
import { useMapEvent, useMap } from "react-leaflet";
import L from "leaflet";
import DraggableMarker from "./DraggableMarker";

const Markers = ({
  saved,
  markers,
  addMarker,
  removeMarker,
  updateMarkerPosition,
}) => {
  const map = useMap();

  const mapEv = useMapEvent("click", (ev) => {
    if (!saved) {
      let { lat, lng } = ev.latlng;
      addMarker(lat, lng);
    }
  });

  useEffect(() => {
    if (saved && markers.length > 1) {
      if (!map) return;

      let routingControl = L.Routing.control({
        waypoints: markers.map((mrk) => L.latLng(mrk.lat, mrk.lng)),
        routeWhileDragging: true,
        addWaypoints: false,
        draggableWaypoints: false,
        createMarker: () => null,
      }).addTo(map);

      return () => map.removeControl(routingControl);
    }
  }, [saved, map, markers]);

  return (
    <>
      {markers.map((mrk) => (
        <DraggableMarker
          key={mrk.id}
          id={mrk.id}
          draggable={!saved}
          removeMarker={removeMarker}
          position={[mrk.lat, mrk.lng]}
          updatePosition={updateMarkerPosition}
        />
      ))}
    </>
  );
};

export default Markers;
