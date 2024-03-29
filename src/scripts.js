// * IMPORTS * //
import './css/styles.css';

import './images/jr-suite.png';
import './images/res-suite.png';
import './images/suite.png';
import './images/single-room.png';
import './images/overlook.png';

import {
  getData,
  bookRoom
} from './api-calls';

import {
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
} from './dom-updates';

import {
  searchByDate,
  parseUserID
} from './bookings';

import flatpickr from 'flatpickr';

// * GLOBAL VARIABLES * //
let customers, bookings, rooms, user, selectedDate, availRooms, selectedRoom, lastFilter;
const roomImages = {
  'residential suite': {
    imageName: 'res-suite',
    altText:'A photo of a hotel bed in a large suite. On the far side of the room, a door leads to a dining area.'
  },
  suite: {
    imageName: 'suite',
    altText: 'A photo of a hotel bed with a grey headboard, white comforter, and lamps on either side.'
  },
  'single room': {
    imageName: 'single-room',
    altText: 'A photo of a hotel room with a window and a bed with lamps on either side.'
  },
  'junior suite': {
    imageName: 'jr-suite',
    altText: 'A photo of a hotel room with large windows, a bed with lamps on either side, and a grey loveseat.'
  }
}

const html = document.querySelector('html');
const body = document.querySelector('body');
const loginPage = document.querySelector('.login-page');
const loginForm = document.querySelector('.login');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const header = document.querySelector('header');
const yourBookings = document.querySelector('.bookings-list');
const yourBookingsCostContainer = document.querySelector('.bookings-cost');
const yourBookingsCost = document.querySelector('.bookings-cost-insert');
const dateField = document.querySelector('.date-picker');
const searchForm = document.querySelector('.date-search');
const dashboard = document.querySelector('.dashboard-view');
const searchResults = document.querySelector('.book-room-view');
const availableRoomsSection = document.querySelector('.bookings-searched');
const filter = document.querySelector('.filter-container');
const logo = document.querySelector('.logo');
const overlay = document.querySelector('.background-overlay');
const confirmationContainer = document.querySelector('.confirmation');


// Event Listeners
window.addEventListener('load', () => {
  flatpickr(dateField, {
    minDate: 'today',
    dateFormat: "Y/m/d"
  });
  Promise.all([getData('customers'), getData('bookings'), getData('rooms')])
    .then(data => {
      customers = data[0].customers;
      bookings = data[1].bookings;
      rooms = data[2].rooms;
    });
});

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateLogin(customers, username.value, password.value) === true) {
    const userID = parseUserID(username.value);
    Promise.resolve(getData('customers', userID))
    .then(data => user = data)
    .then(() =>  setDashboard(user, bookings, rooms));
  };
});

logo.addEventListener('click', (event) => {
  console.log(event.target)
  setDashboard(user, bookings, rooms);
});

logo.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    setDashboard(user, bookings, rooms)
  };
});

searchForm.addEventListener('submit', (event) => {
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

availableRoomsSection.addEventListener('keyup', (event) => {  
  if (event.target.classList.contains('room-selection') && event.key === 'Enter') {
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

confirmationContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('icon-exit')) {
    hide(overlay);
    availRooms = searchByDate(bookings, rooms, selectedDate)
    displaySearchResults(availRooms);
    lastFilter === 'any' ? displaySearchResults(availRooms) : filterByRoomType(availRooms, lastFilter)
  };
});

confirmationContainer.addEventListener('keyup', (event) => {
  if (event.target.classList.contains('icon-exit') && event.key === 'Enter') {
    hide(overlay);
    availRooms = searchByDate(bookings, rooms, selectedDate)
    displaySearchResults(availRooms);
    lastFilter === 'any' ? displaySearchResults(availRooms) : filterByRoomType(availRooms, lastFilter)
  };
});

confirmationContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('book-now')) {
    Promise.resolve(bookRoom(user.id, selectedDate, event.target.closest('article').id))
    .then(data => {
      console.log(data)
      bookings = data.bookings;
      availRooms = searchByDate(bookings, rooms, selectedDate)
    })
    .then(displayThankYou());
  };
});

confirmationContainer.addEventListener('keyup', (event) => {
  if (event.target.classList.contains('book-now') && event.key === 'Enter') {
    Promise.resolve(bookRoom(user.id, selectedDate, event.target.closest('article').id))
    .then(data => {
      bookings = data.bookings;
      availRooms = searchByDate(bookings, rooms, selectedDate)
    })
    .then(displayThankYou());
  };
});

confirmationContainer.addEventListener('click', (event) => {
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
  confirmationContainer,
  loginPage,
  header,
  html,
  body,
  searchForm,
  loginForm
};