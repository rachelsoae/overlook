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
    yourBookings.innerHTML = `<h3>${usersBookings}</h3>`;
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
    availableRoomsSection.innerHTML = `<h3>${availRooms}</h3>`;
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
    availableRoomsSection.innerHTML = `<h3>${filteredRooms}</h3>`;
  } else {
    availableRoomsSection.innerHTML = '';
    filteredRooms.forEach(room => {
      let availRoom = getRoomDetails(room);
      availableRoomsSection.innerHTML += createSearchCard(availRoom);
    }) ;
  };

  return availRooms;
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
  const searchRoomCard = 
  `
    <article class="room">
      <h3 class="room-type">${room.roomType} ${room.bidet}</h3>  
      <img class="room-image" src=${room.image} alt="photo of a ${room.roomType}">
      <div class="room-details">
        <span class="material-icons-round">bed</span>  
        <p class="num-beds">${room.numBeds} ${room.bedSize}</p>
      </div>
      <p class="cost">$${room.cost} per night</p>
    </article>
  `;
  return searchRoomCard;
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
  filterByRoomType
};