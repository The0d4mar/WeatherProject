import * as React from 'react';


import City from './City';
import Weather from './WeatherInfo';



function Main () {

    const [latitude, setLatitude] = React.useState(null);
    const [longitude, setLongitude] = React.useState(null);
    const [selectedCity, setSelectedCity] = React.useState(null)

    const handleCitySelect = (selectedLatitude, selectedLongitude, selectedCity) => {
    setLatitude(selectedLatitude);
    setLongitude(selectedLongitude);
    setSelectedCity(selectedCity)
    };

    return (
        <main >
            <City onCitySelect={handleCitySelect}/>
            <Weather latitude={latitude} longitude={longitude} city = {selectedCity}/>
        </main>
    )
};


export default Main;