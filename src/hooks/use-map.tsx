import { RefObject, useEffect, useRef, useState } from 'react';
import leaflet, { Map } from 'leaflet';
import { LocationType } from '../types/offers';
import { TileLayerParam } from '../const';

function useMap(
  mapRef: RefObject<HTMLElement | null>,
  location: LocationType
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: location?.latitude,
          lng: location?.longitude
        },
        zoom: location.zoom
      });

      leaflet.tileLayer(TileLayerParam.Argument, {
        attribution: TileLayerParam.Attribution,
      }).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  return map;
}

export default useMap;
