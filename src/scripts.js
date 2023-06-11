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
  filterByRoomType
} from './dom-updates';

import {
  searchByDate
} from './bookings';

import flatpickr from 'flatpickr';

// * GLOBAL VARIABLES * //
let customers, bookings, rooms, user, selectedDate, availRooms;
const roomImages = {
  'residential suite': 'res-suite',
  suite: 'suite',
  'single room': 'single-room',
  'junior suite': 'jr-suite'
};

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
      customers = data[0].customers
      bookings = data[1].bookings
      rooms = data[2].rooms
      user = data[3]
      console.log(user)
      setDashboard(user, bookings, rooms)
    });
});

logo.addEventListener('click', () => {
  showDashboard();
  setDashboard(customers[1], bookings, rooms);
});

dateSearch.addEventListener('submit', (event) => {
  event.preventDefault(); 
  if (dateField.value) {
    selectedDate = dateField.value;
    availRooms = searchByDate(bookings, rooms, selectedDate);
    showSearchResultsView();
    displaySearchResults(availRooms);
  };
});

filter.addEventListener('change', (event) => {
  event.target.value === 'any' ? displaySearchResults(availRooms) : filterByRoomType(availRooms, event.target.value)
});

availableRoomsSection.addEventListener('click', (event) => {
  if (event.target.classList.contains('room-selection')) {
    bookRoom(user.id, selectedDate, event.target.closest('article').id)
  };
})

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
  availRooms
};