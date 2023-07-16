import React, { useRef, useMemo } from "react";

import { Marker, Tooltip } from "react-leaflet";

import geoImage from "../assets/img.png";

import L from "leaflet";

let myIcon = L.icon({
  iconUrl: geoImage,
  iconSize: [20, 20],
  iconAnchor: [20, 20],
  popupAnchor: [-10, -12],
});

const DraggableMarker = ({
  id,
  removeMarker,
  position,
  updatePosition,
  draggable,
}) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          let { lat, lng } = marker.getLatLng();
          updatePosition(id, lat, lng);
        }
      },
      click() {
        if (draggable) {
          removeMarker(id);
        }
      },
    }),
    [draggable]
  );

  return (
    <Marker
      icon={myIcon}
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      className="marker"
    >
      <Tooltip direction="left" offset={[-20, -10]}>
        Pick up point
      </Tooltip>
    </Marker>
  );
};

export default DraggableMarker;
