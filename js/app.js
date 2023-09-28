const API_KEY = `46ad7457603b9b0104e633e78cd60e16`;
//My wether button callback function
const succesLocation = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(position, lat, lon)
    searchTemperature(lat, lon)
}
const errorLocation = (error) => {
    console.error(error);
}

//My wether button 
const myWetherButton = document.getElementById('my-wether')
myWetherButton.addEventListener('click', async () => {
    navigator.geolocation.getCurrentPosition(succesLocation, errorLocation)
})

//for geting wether from search 
const searchTemperature = (lat, lon) => {
    const selectElement = document.querySelector('#select1');
    const output = selectElement.options[selectElement.selectedIndex].value;
    const city = document.getElementById('city-name').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${output}&lat=${lat}&lon=${lon}`;
    console.log(url)
    try {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.cod === "400" || data.cod === '404') {
                    console.log(data.cod)
                    alert(data.message + ': Enter correct location ')
                    document.getElementById('city-name').value = ''
                } else {
                    displayTemperature(data, output)
                    document.getElementById('city-name').value = ''
                }
            })
    } catch (error) {
        console.error(error);
    }
}

//Ready function for set text on html
const setInnerText = (id, text) => {
    document.getElementById(id).innerText = text;
}
//Show data
const displayTemperature = (temperature, output) => {
    try {
        if (temperature) {
            setInnerText('city', temperature?.name);
            setInnerText('temperature', temperature?.main?.temp);
            setInnerText('condition', temperature?.weather[0]?.main);
            setInnerText('wind-degree', temperature?.wind?.deg);
            setInnerText('wind-speed', temperature?.wind?.speed);
            setInnerText('humidity', temperature?.main?.humidity);
            if (output === 'metric') {
                setInnerText('temperature-unit', "C");
            } else if (output === 'imperial') {
                setInnerText('temperature-unit', "F");
            }
            // set weather icon
            const url = `http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
            const imgIcon = document.getElementById('weather-icon');
            imgIcon.setAttribute('src', url);
        } else {
            return setInnerText('city', 'dhaka');
        }
    } catch (error) {
        console.error(error);
    }


}