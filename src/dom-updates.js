import {
  getBookings,
  getTotalCost,
  searchByRoomType,
  validateUsername,
  validatePassword,
  sortByDate
} from './bookings';

import {
  roomImages,
  yourBookings,
  yourBookingsCost,
  yourBookingsCostContainer,
  dashboard,
  searchResults,
  availableRoomsSection,
  overlay,
  confirmationContainer,
  loginPage,
  header,
  html,
  body,
  searchForm,
  loginForm
} from './scripts';

const validateLogin = (customers, username, password) => {
  if (!validateUsername(customers, username) || !validatePassword(password)) {
    loginForm.reset();
    alert('Oops! One or more of the values you have entered are invalid. Please try again.')
  } else {
    return true;
  };
};

const removeLoginStyling = () => {
  html.classList.remove('html-login');
  body.classList.add('body-main');
}

const showDashboard = () => {
  show(header);
  show(dashboard);
  hide(searchResults);
  hide(loginPage);
  removeLoginStyling();
  searchForm.reset();
};

const showSearchResultsView = () => {
  show(header);
  show(searchResults);
  hide(dashboard);
  hide(loginPage);
};

const setDashboard = (customer, allBookings, allRooms) => {
  showDashboard();
  const usersBookings = getBookings(allBookings, customer);
  
  if (typeof usersBookings === 'string') {
    yourBookingsCostContainer.classList.add('invisible');
    yourBookings.innerHTML = `<p tabindex="0">${usersBookings}</p>`;
  } else {
    yourBookingsCostContainer.classList.remove('invisible');
    const spent = getTotalCost(allRooms, usersBookings);
    yourBookingsCost.innerText = `$${spent}`;
    const sorted = sortByDate(usersBookings)
    yourBookings.innerHTML = '';  
    sorted.forEach(booking => {
      const roomRef = allRooms.find(room => room.number === booking.roomNumber);
      let dashRoom = getRoomDetails(roomRef);
      yourBookings.innerHTML += createDashboardCard(dashRoom, booking);
    });
  };
};

const displaySearchResults = (availRooms) => {
  if (typeof availRooms === 'string') {
    availableRoomsSection.innerHTML = `<p tabindex="0">${availRooms}</p>`;
  } else {
    availableRoomsSection.innerHTML = '';
    availRooms.forEach(room => {
      let availRoom = getRoomDetails(room);
      availableRoomsSection.innerHTML += createSearchCard(availRoom);
    }) ;
  };

  return availRooms;
};

const filterByRoomType = (availRooms, roomType) => {
  const filteredRooms = searchByRoomType(availRooms, roomType);

  if (typeof filteredRooms === 'string') {
    availableRoomsSection.innerHTML = `<p tabindex="0">${filteredRooms}</p>`;
  } else {
    availableRoomsSection.innerHTML = '';
    filteredRooms.forEach(room => {
      let availRoom = getRoomDetails(room);
      availableRoomsSection.innerHTML += createSearchCard(availRoom);
    }) ;
  };
};

const getRoomDetails = (room) => {
  const roomInfo = {...room};
  roomInfo.image = `./images/${roomImages[roomInfo.roomType].imageName}.png`;
  roomInfo.imageAltText = `${roomImages[roomInfo.roomType].altText}`
  roomInfo.bidet = room.bidet ? 'with bidet' : '';
  roomInfo.cost = room.costPerNight.toFixed(2);
  return roomInfo;
};

const createDashboardCard = (room, booking) => {
  const dashBookingCard =
  `
    <article class="room" tabindex="0">
      <h3 class="room-type" tabindex="0">${room.roomType} ${room.bidet}</h3>  
      <p class="booking-date" tabindex="0">${booking.date}</p>
      <img class="room-image" src=${room.image} alt="${room.imageAltText}" tabindex="0">
      <div class="room-details">
        <span class="material-icons-round">bed</span>  
        <p class="num-beds" tabindex="0">${room.numBeds} ${room.bedSize}</p>
      </div>
    </article>
  `;
  return dashBookingCard;
}

const createSearchCard = (room) => {
  const searchResultCard = 
  `
    <article class="room room-selection search-card" id=${room.number} tabindex="0">
      <h3 class="room-type room-selection" tabindex="0">${room.roomType} ${room.bidet}</h3>  
      <img class="room-image room-selection" src=${room.image} alt="${room.imageAltText}" tabindex="0">
      <div class="room-details room-selection">
        <span class="material-icons-round room-selection">bed</span>  
        <p class="num-beds room-selection" tabindex="0">${room.numBeds} ${room.bedSize}</p>
      </div>
      <p class="cost room-selection" tabindex="0">$${room.cost} per night</p>
    </article>
  `;
  return searchResultCard;
}

const displayConfirmation = (room) => {
  show(overlay);
  confirmationContainer.focus();
  confirmationContainer.innerHTML = 
  `
  <div class="icon-exit-container">
    <span class="material-icons-round icon-exit" tabindex="0">cancel</span>
  </div>
  <div class="confirmation-box">
    <article class="confirmation-room" id=${room.number}>
      <h2 tabindex="0">Click "Book Now" to confirm your reservation</h2>
      <img class="room-image" src=${room.image} alt="${room.imageAltText}" tabindex="0">  
      <h3 class="room-type" tabindex="0">${room.roomType} ${room.bidet}</h3>  
      <div class="room-details">
        <span class="material-icons-round">bed</span>  
        <p class="num-beds" tabindex="0">${room.numBeds} ${room.bedSize}</p>
      </div>
      <p class="cost" tabindex="0">$${room.cost} per night</p>
      <button class="book-now search" tabindex="0">Book Now</button>
    </article>
  </div>
  `
}

const displayThankYou = () => {
  confirmationContainer.innerHTML = 
  `
  <div class="icon-exit-container">
    <span class="material-icons-round icon-exit" tabindex="0">cancel</span>
  </div>
  <div class="confirmation-box">
    <div class="thank-you">
      <h2 tabindex="0">Congratulations!</h2>
      <h3 tabindex="0">Your next stay is booked.</h3>
      <p tabindex="0">Click below to return to your bookings</p>
      <p tabindex="0">Exit to return to your search results</p>
      <button class="search home" tabindex="0">View Dashboard</button>
    </div>
  </div>
  `
}

const identifyRoom = (roomsArray, roomNumber) => {
  return roomsArray.find(room => roomNumber == room.number)
}

const hide = (element) => {
  element.classList.add('hidden');
};

const show = (element) => {
  element.classList.remove('hidden');
};

export {
  validateLogin,
  setDashboard,
  displaySearchResults,
  showSearchResultsView,
  filterByRoomType,
  displayConfirmation,
  identifyRoom,
  getRoomDetails,
  displayThankYou,
  hide
};