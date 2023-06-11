// * IMPORTS * //
import './css/styles.css';

import './images/jr-suite.png';
import './images/res-suite.png';
import './images/suite.png';
import './images/single-room.png';

import {
  getUserData,
  getAllCustomersData,
  getBookingsData,
  getRoomsData,
  bookRoom
} from './api-calls';

import {
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
} from './dom-updates';

import {
  searchByDate
} from './bookings';

import flatpickr from 'flatpickr';

// * GLOBAL VARIABLES * //
let customers, bookings, rooms, user, selectedDate, availRooms, selectedRoom, lastFilter;
const roomImages = {
  'residential suite': {
    imageName: 'res-suite',
    altText:'A photo of a luxurious cream-colored suite with high ceilings. The bed is adorned with a white comforter and decorated with black and white pillows. On the far side of the room, there is a door that leads to a sophisticated dining area.'
  },
  suite: {
    imageName: 'suite',
    altText: 'A photo of a luxurious hotel bed showcasing a grey headboard, adorned with a white comforter and an arrangement of grey and white pillows. A lamp is placed on each side of the bed, providing warm illumination.'
  },
  'single room': {
    imageName: 'single-room',
    altText: 'A photo of a cozy hotel room with natural lighting, a bed with grey headboard and white bedding, a side table with a lamp, and a wall-mounted TV.'
  },
  'junior suite': {
    imageName: 'jr-suite',
    altText: 'A photo of a well-lit hotel room with large windows, a cozy bed featuring a white comforter, grey headboard, and grey/white pillows. Bedside lamps flank the bed, while a grey loveseat and coffee table with a vase of white flowers complete the scene.'
  }
}

const yourBookings = document.querySelector('.bookings-list');
const yourBookingsCostContainer = document.querySelector('.bookings-cost');
const yourBookingsCost = document.querySelector('.bookings-cost-insert');
const dateField = document.querySelector('.date-picker');
const dateSearch = document.querySelector('form');
const dashboard = document.querySelector('.dashboard-view');
const searchResults = document.querySelector('.book-room-view');
const availableRoomsSection = document.querySelector('.bookings-searched');
const filter = document.querySelector('.filter-container');
const logo = document.querySelector('h1');
const overlay = document.querySelector('.background-overlay');
const confirmationBox = document.querySelector('.confirmation');

// Event Listeners
window.addEventListener('load', () => {
  flatpickr(dateField, {
    minDate: 'today',
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y/m/d"
  });
  Promise.all([getAllCustomersData(), getBookingsData(), getRoomsData(), getUserData('1')])
    .then(data => {
      customers = data[0].customers;
      bookings = data[1].bookings;
      rooms = data[2].rooms;
      user = data[3];
      console.log(user);
      setDashboard(user, bookings, rooms);
    });
});

logo.addEventListener('click', () => {
  setDashboard(user, bookings, rooms);
});

dateSearch.addEventListener('submit', (event) => {
  event.preventDefault(); 
  if (dateField.value) {
    lastFilter = 'any'
    selectedDate = dateField.value;
    availRooms = searchByDate(bookings, rooms, selectedDate);
    showSearchResultsView();
    displaySearchResults(availRooms);
  };
});

filter.addEventListener('change', (event) => {
  lastFilter = event.target.value;
  lastFilter === 'any' ? displaySearchResults(availRooms) : filterByRoomType(availRooms, lastFilter);
});

availableRoomsSection.addEventListener('click', (event) => {  
  if (event.target.classList.contains('room-selection')) {
    selectedRoom = identifyRoom(availRooms, event.target.closest('article').id);
    let bookingDetails = getRoomDetails(selectedRoom);
    displayConfirmation(bookingDetails);
  };
});

overlay.addEventListener('click', (event) => {
  if (event.target.classList.contains('background-overlay')) {
    hide(overlay);
    availRooms = searchByDate(bookings, rooms, selectedDate)
    displaySearchResults(availRooms);
    lastFilter === 'any' ? displaySearchResults(availRooms) : filterByRoomType(availRooms, lastFilter)
  };
});

confirmationBox.addEventListener('click', (event) => {
  if (event.target.classList.contains('book-now')) {
    Promise.resolve(bookRoom(user.id, selectedDate, event.target.closest('article').id))
    .then(data => {
      bookings = data.bookings;
      availRooms = searchByDate(bookings, rooms, selectedDate)
    })
    .then(displayThankYou());
  };
});

confirmationBox.addEventListener('click', (event) => {
  if (event.target.classList.contains('home')) {
    hide(overlay);
    setDashboard(user, bookings, rooms);
  };
});

export {
  customers,
  bookings,
  rooms,
  roomImages,
  yourBookings,
  yourBookingsCostContainer,
  yourBookingsCost,
  dashboard,
  searchResults,
  availableRoomsSection,
  availRooms,
  selectedRoom,
  overlay,
  confirmationBox
};