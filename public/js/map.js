if (listingCoordinates) {

    mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
        center: listingCoordinates,
        zoom: 9
    });

    const marker = new mapboxgl.Marker({ color: "#fe424d" })
        .setLngLat(listingCoordinates)
         
        .addTo(map);
}