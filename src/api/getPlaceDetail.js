import API_KEY from '../components/global';
const getPlaceDetail = (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${API_KEY}`;
    return fetch(url)
        .then(res => res.json());
};

export default getPlaceDetail;
