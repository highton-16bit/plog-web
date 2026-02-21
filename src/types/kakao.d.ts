declare namespace kakao {
  namespace maps {
    function load(callback: () => void): void;

    class Map {
      constructor(
        container: HTMLElement,
        options: { center: LatLng; level: number }
      );
      setCenter(latlng: LatLng): void;
      getLevel(): number;
      setLevel(level: number): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Marker {
      constructor(options: { position: LatLng; map?: Map });
      setMap(map: Map | null): void;
    }
  }
}

interface Window {
  kakao: typeof kakao;
}
