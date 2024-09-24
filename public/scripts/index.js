let responseDom = document.getElementById("response");
let cookieDom = document.getElementById("cookie");
let locationDom = document.getElementById("location");
let latlongDom = document.getElementById("latlong");
let weatherDom = document.getElementById("weather");


// funktion til at hente respons fra server
// async funktion med await
async function getResponse() {
  // try catch blok
  try {
    // fetch data fra /res endpoint og await responsen
    const response = await fetch('/res');
    
    // hvis responsen ikke er ok, kast en fejl
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // konverter responsen til tekst
    const data = await response.text(); 
    
    // håndter succes
    console.log(data);
    responseDom.innerHTML = data;
  } catch (error) {
    // håndter fejl
    console.log(error);
    responseDom.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}


// funktion til at sætte cookie
// async funktion med await
async function setCookie() {
    // try catch blok
    try {
      // fetch data fra /res endpoint og await responsen
      const response = await fetch('/cookie');

      // hvis responsen ikke er ok, kast en fejl
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // konverter responsen til tekst
      const value = await response.text();

      // håndter succes
      console.log(value);
      cookieDom.innerHTML = value;
    } catch (error) {
      // håndter fejl
      console.log(error);
      cookieDom.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}


// funktion til at hente placering og kalder getLatLong() funktionen
// async funktion med await
async function getLocation() {
  const dropdown = document.getElementById('locationDropdown');
  const selectedLocation = dropdown.options[dropdown.selectedIndex].text;
  locationDom.innerHTML = `Your location is ${selectedLocation}`;
  document.cookie = `location=${selectedLocation}; path=/;`;
  await getLatLong(selectedLocation);
}


// ----------------------------------------------------------------------------------------------------
// Opgave 2: Lav en asynkron funktion med locationName som parameter til at hente latitude og longitude 
// url for API: `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&addressdetails=1`
// dokumentation for API: https://nominatim.org/release-docs/develop/api/Search/
// response er json() data og skal konverteres og brug console.log() til at se data
// denne funktion bliver kaldt i getLocation() funktionen

// async funktion med await
async function getLatLong(locationName) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=geojson`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    
    if (data.features && data.features.length > 0) {
      const { lat, lon } = data.features[0].geometry.coordinates;
      latlongDom.innerHTML = `Latitude: ${lat}, Longitude: ${lon}`;
      await getWeather(lat, lon);
    } else {
      throw new Error('No location data found');
    }
  } catch (error) {
    console.log(error);
    latlongDom.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
// ----------------------------------------------------------------------------------------------------


// ----------------------------------------------------------------------------------------------------
// Opgave 3: Lav en asynkron funktion med latitude og longitude som parametre til at hente vejrdata
// url for API: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`
// dokumentation for API: https://open-meteo.com/en/docs
// response er json() data og skal konverteres og brug console.log() til at se data
// denne funktion bliver kaldt i getLatLong() funktionen

// async funktion med await
async function getWeather(lat, long) {





}
// ----------------------------------------------------------------------------------------------------