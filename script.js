window.onload = () => {
    // Map center coordinates for Toronto, Ontario
    const mapCenter = { lat: 43.65107, lng: -79.347015 };
   

    document.getElementById("map").style.display = "block";

    // Initialize the map
    const map = new google.maps.Map(document.getElementById("map"), {
      center: mapCenter,
      zoom: 12,
    });
   
    // API service
    const service = new google.maps.places.PlacesService(map);
   
    // Search box
    const searchBox = document.getElementById("search-box");
   
    // Array to store restaurant markers
    const restaurantMarkers = [];
   
    // Handle search box input
    searchBox.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const searchInput = searchBox.value;
   
        if (!searchInput) {
          alert("Please enter a search...");
          return;
        }
   
        const request = {
          location: mapCenter,
          radius: 50000, // km radius
          keyword: searchInput,
          type: "restaurant",
        };
   
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarkers();
            results.forEach((place) => {
              if (place.geometry && place.geometry.location) {
                addRestaurantMarker(place);
              }
            });
          } else {
            console.error("Service failed due to: " + status);
            alert("No results found for your search!");
          }
        });
      }
    });
   
    // Add a marker for a restaurant
    const addRestaurantMarker = (place) => {
      const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,

        });
        const infoWindow = new google.maps.InfoWindow({
            content: `
            <div>
                <h3> ${place.name}</h3>
                <p><strong>Adrress:</strong> ${place.vicinity || "N/A"}</p>
                <p><strong>Rating:</strong> ${place.rating || "N/A"}</p>
                <p><strong>Phone:</strong> ${place.formatted_phone_number || "N/A"}</p>
                <p><strong>Price Level:</strong> ${
                place.price_level ? "$" .repeat(place.price_level) : "N/A" 
        }</p>
        <p><strong>Hours:</strong> ${
        place.opening_hours?.open_now
        ? "Open"
        : "Closed"
        }</p>
        <a href="${place.website || "#"}"target=" blank">Visit Website</a>
        <div>
        `
    });

    marker.addListener("click", () => {
        infowWindow.open(map, marker);
    });

    restaurantMarkers.push(marker);
};   

 // Show content in the sidebar
 const showSidebarContent = (place) => {
    const videoContainer = document.getElementById("video-container");

    // Placeholder videos for TikTok or Instagram
    const videoHTML = `
    <div class="video=thumbnail">
    img src="https://via.placeholder.com/150" alt="${place.name} Thumbnail">
    <p>${place.name}</p>
    </div>
    `;
  
    videoContainer.innerHTML = `
    <div>
    <h3>${place.name}</h3>
    <p><strong>Address:</strong> ${place.vicinity || "N/A"}</p>
    <p><strong>Rating:</strong> ${place.rating || "N/A"}</p>
    <p><strong>Price Level:</strong> ${
      place.price_level? "$".repeat(place.price_level) : "N/A"
    }</p>
    <p><strong>Hours:</strong> ${
      place.opening_hours?.open_now
       ? "Open Now!"
        : "Currently Closed"
    }</p>
    <p><strong>Aesthetics:</strong> Beatiful interiors with great vides.</p>
    <p><strong>Location Size:</strong> Medium-sized space, perfect for groups.</p>
    ${videoHTML}
    </div>
      `;

  // Text-to-speech
  const texttospeech = `
  You selected ${place.name}.
  It is located at ${place.vicinity}.
  The rating is ${place.rating || "unavailable"}
  Enjoy the vibes with your friends and family.
  `;
  triggerTextToSpeech(texttospeech);
  };

  // Text-to-speech feature
  const triggerTextToSpeech = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  };

// Function to clear restaurant markers
const clearMarkers = () => {
    restaurantMarkers.forEach((marker) => marker.setMap(null));
    restaurantMarkers.length = 0;
};


// Clear marker function
document.getElementById("clear-markers").addEventListener("click", clearMarkers);

//Function to add favourite
window.addToFavorites = (name, address) => {
    if (!favouriteSpots.some((spot) => spot.name === name)) {
        favouriteSpots.push({name, address });
        displayFavourites();
    } else {
        alert("This spot is already in your favorites");
    }
};

//Display favorites in the sidebar
const displayFavourites = () => {
    const sidebar = document.getElementById("video-container");
    sidebar.innerHTML = "<h2>Favourite Spots</h2>";
    favouriteSpots.forEach((spot) => {
        sidebar.innerHTML += `<div>
        <p><strong>${spot.name}</strong></p>
        <p>${spot.address}</p>
        <button onclick="removeFromFavourites('${spot.name}')">Remove</button>
        </div>`;
    });
};
};

 edd78ec26f43e2bca0f14c3ef493f7b8eefef0a8
