const weatherApiKey = "3bc673086eb50810f1f0817f41b64883";
var defaultLocation;

const searchBar = document.querySelector('.searchBar');
const btn = document.querySelector('.btn');


function windowLoad() {
    const successCallback = (position) => {
        const cordsApi = "https://api.opencagedata.com/geocode/v1/json";
        const cordsApiweatherApiKey = "191fa887d4694885b80ba152d0a13f69";
        const longLatitide = `${position.coords.latitude},${position.coords.longitude}`;

        const apiUrl = `${cordsApi}?key=${cordsApiweatherApiKey}&q=${longLatitide}&pretty=1`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                const userLocation = data.results[0].components.state;
                console.log(`OnLoad User Location is ${userLocation}`);
                defaultLocation = userLocation;
                onSearch();
            });


    };

    const errorCallback = (error) => {
        defaultLocation
        alert("To Continue using live location, You have to accept the location 🫡 !!!");
    
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

} windowLoad();



function onSearch() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${weatherApiKey}`)
        .then(response => response.json())
        .then(weatherdata => {
          
const DayArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const currDay = document.querySelector('.dateMonth .day');
const currDate = document.querySelector('.dateMonth .date');
const currMonth = document.querySelector('.dateMonth .month');

const tempDeg = document.querySelector('.tempDeg');
const currplace = document.querySelector('.currplace');
const weatherStatus = document.querySelector('.weather .active');
const humidity = document.querySelector('.humidity .humi');
const windspeed = document.querySelector('.windspeed .speed');
const winddir = document.querySelector('.winddir .dir');

const date = new Date();
currDate.innerHTML = date.getDate();

for (let i = 0; i < DayArr.length; i++) {
    currDay.innerHTML = DayArr[date.getDay()];
}

for (let j = 0; j < monthsArr.length; j++) {
    currMonth.innerHTML = monthsArr[date.getMonth()];
}

tempDeg.textContent = (weatherdata.main.temp - 273.15).toString().substring(0, 2);
weatherStatus.innerHTML = weatherdata.weather[0].main;


currplace.innerHTML = weatherdata.name;
humidity.textContent = weatherdata.main.humidity;
windspeed.textContent = weatherdata.wind.speed;
winddir.textContent = weatherdata.wind.deg;
            }
        )};

        
btn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log(`User Searched Location is ${searchBar.value}`);
    defaultLocation = searchBar.value;

    onSearch();
    searchBar.value = '';
});


searchBar.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        btn.dispatchEvent(new Event("click"));
    }
});






