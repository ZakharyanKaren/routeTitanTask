import React, { useRef, useEffect, useState } from "react";
import * as styles from "./Map.module.css";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";
import RoomIcon from "@material-ui/icons/Room";
import reactDom from "react-dom";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWxmaGlqYXNlaGZpbnF3cmoiLCJhIjoiY2t0NXFpc2FlMGI0dDJ4bGFsb3VuODdyNiJ9.A8AQu5tCm9f6pwYQUV77pQ";

export default function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    const stops = props.routeData.stops;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [stops[0].address.lng, stops[0].address.lat],
      zoom: 10,
    });

    let coordinates = [];

    props.routeData.stops.forEach((stop, currentValue) => {
      coordinates.push([stop.address.lng, stop.address.lat]);

      if (stop.type === "start") return false;

      let className = styles.unfinished;
      if (props.isFinished !== null && currentValue <= props.isFinished) {
        className = styles.finished;
      }

      let elem = document.createElement("div");
      elem.className = styles.marker;
      elem.innerHTML =
        '<div class="' + className + '">' + currentValue + "</div>";

      let marker = new mapboxgl.Marker(elem);

      marker.setLngLat({
        lng: stop.address.lng,
        lat: stop.address.lat,
      });

      let popup = new mapboxgl.Popup({ offset: 24, closeButton: false });
      popup.setHTML(
        "<div>Name: " +
          stop.information.name +
          "<br>City: " +
          stop.information.city +
          "</div>"
      );

      // Set the marker's popup.
      marker.setPopup(popup);

      marker.addTo(map.current);
    });

    map.current.attributionControl = false;

    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#1329FE",
          "line-width": 3,
        },
      });
    });
  }, [props.routeData]);

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
