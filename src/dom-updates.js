import {
  getBookings,
  getTotalCost,
  searchByRoomType
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
  confirmationBox
} from './scripts';

const showDashboard = () => {
  show(dashboard);
  hide(searchResults);
};

const showSearchResultsView = () => {
  show(searchResults);
  hide(dashboard);
};

const setDashboard = (customer, allBookings, allRooms) => {
  showDashboard();
  const usersBookings = getBookings(allBookings, customer);
  
  if (typeof usersBookings === 'string') {
    yourBookingsCostContainer.classList.add('invisible');
    yourBookings.innerHTML = `<p class="error-message">${usersBookings}</p>`;
  } else {
    yourBookingsCostContainer.classList.remove('invisible');

    const spent = getTotalCost(allRooms, usersBookings);
    yourBookingsCost.innerHTML = `$${spent}`;

    yourBookings.innerHTML = '';    
    usersBookings.forEach(booking => {
      const roomRef = allRooms.find(room => room.number === booking.roomNumber);
      let dashRoom = getRoomDetails(roomRef);
      yourBookings.innerHTML += createDashboardCard(dashRoom, booking);
    });
  };
};

const displaySearchResults = (availRooms) => {
  if (typeof availRooms === 'string') {
    availableRoomsSection.innerHTML = `<p class="error-message">${availRooms}</p>`;
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
    availableRoomsSection.innerHTML = `<p class="error-message">${filteredRooms}</p>`;
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
  roomInfo.image = `./images/${roomImages[roomInfo.roomType]}.png`;
  roomInfo.bidet = room.bidet ? 'with bidet' : '';
  roomInfo.cost = room.costPerNight.toFixed(2);
  return roomInfo;
};

const createDashboardCard = (room, booking) => {
  const dashBookingCard =
  `
    <article class="room">
      <h3 class="room-type">${room.roomType} ${room.bidet}</h3>  
      <p class="booking-date">${booking.date}</p>
      <img class="room-image" src=${room.image} alt="photo of a ${room.roomType}">
      <div class="room-details">
        <span class="material-icons-round">bed</span>  
        <p class="num-beds">${room.numBeds} ${room.bedSize}</p>
      </div>
    </article>
  `;
  return dashBookingCard;
}

const createSearchCard = (room) => {
  const searchResultCard = 
  `
    <article class="room room-selection" id=${room.number}>
      <h3 class="room-type room-selection">${room.roomType} ${room.bidet}</h3>  
      <img class="room-image room-selection" src=${room.image} alt="photo of a ${room.roomType}">
      <div class="room-details room-selection">
        <span class="material-icons-round room-selection">bed</span>  
        <p class="num-beds room-selection">${room.numBeds} ${room.bedSize}</p>
      </div>
      <p class="cost room-selection">$${room.cost} per night</p>
    </article>
  `;
  return searchResultCard;
}

const displayConfirmation = (room) => {
  show(overlay)
  confirmationBox.innerHTML = 
  `
  <h2>Click "Book Now" to confirm your reservation  </h2>
  <article class="confirmation-room" id=${room.number}>
    <img class="room-image" src=${room.image} alt="photo of a ${room.roomType}">  
    <h3 class="room-type">${room.roomType} ${room.bidet}</h3>  
    <div class="room-details">
      <span class="material-icons-round">bed</span>  
      <p class="num-beds">${room.numBeds} ${room.bedSize}</p>
    </div>
    <p class="cost">$${room.cost} per night</p>
    <button class="book-now search">Book Now</button>
  </article>
  `
}

const displayThankYou = () => {
  confirmationBox.innerHTML = 
  `
  <div class="thank-you">
    <h2>Congratulations!</h2>
    <h3>Your next stay is booked.</h3>
    <p>Click below to return to your bookings</p>
    <p>Click outside this box to return to your search results</p>
    <button class="search home">View Dashboard</button>
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
  setDashboard,
  displaySearchResults,
  showDashboard,
  showSearchResultsView,
  filterByRoomType,
  displayConfirmation,
  identifyRoom,
  getRoomDetails,
  displayThankYou,
  hide
};