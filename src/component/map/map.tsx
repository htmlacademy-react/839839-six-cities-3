import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { LocationType, OffersType, OfferType } from '../../types/offers';
import { UrlMarker } from '../../const';

const MAP_HEIGHT = '100%';

type MapProps = {
  location: LocationType;
  points: OffersType;
  selectedPoint: OfferType | undefined;
};

const defaultCustomIcon = leaflet.icon({
  iconUrl: UrlMarker.Default,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = leaflet.icon({
  iconUrl: UrlMarker.Current,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({location, points, selectedPoint}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);
  const markerLayer = useRef<leaflet.LayerGroup | null>(null);

  useEffect(() => {
    if (map) {
      if (markerLayer.current) {
        markerLayer.current.clearLayers();
      }

      markerLayer.current = leaflet.layerGroup().addTo(map);

      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.location.latitude,
            lng: point.location.longitude,
          }, {
            icon: (point.id === selectedPoint?.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(markerLayer.current!);
      });
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, points, selectedPoint, location]);

  return (
    <div style={{height: MAP_HEIGHT}} ref={mapRef}></div>
  );
}

export default Map;
