import "../styles/SideBar.css";
import React from "react";

import { useMap } from "react-leaflet";

import {
  MdOutlineSave,
  MdOutlineModeEditOutline,
  MdInfoOutline,
  MdOutlineAdd,
} from "react-icons/md";

const SideBar = ({ saved, save, unsave, add, markersList }) => {
  return (
    <div className="sidebar">
      <p>
        <MdInfoOutline size={20} className="icon" /> click in the map to add a
        marker or click add button
      </p>

      <button className="add_btn" onClick={add} disabled={saved}>
        <MdOutlineAdd size={20} className="icon" /> add
      </button>

      <button className="save_btn" onClick={save} disabled={saved}>
        <MdOutlineSave size={20} className="icon" /> save
      </button>

      <button className="edit_btn" onClick={unsave} disabled={!saved}>
        <MdOutlineModeEditOutline size={20} className="icon" />
        edit
      </button>

      <h4>Markers</h4>
      <div className="markers_list">
        {markersList.map((mrk, i) => (
          <div key={mrk.id} className="marker_item">
            <div>{i + 1}</div>
            <div>
              <span>
                lat: <strong>{mrk.lat}</strong>
              </span>
              ,
              <span>
                lng: <strong>{mrk.lng}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
