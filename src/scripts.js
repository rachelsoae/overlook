// * IMPORTS * //
import './css/styles.css';

import './images/jr-suite.png';
import './images/res-suite.png';
import './images/suite.png';
import './images/single-room.png';

import {
  getCustomersData,
  getBookingsData,
  getRoomsData,
} from './api-calls';

import {
  setDashboard,
  displaySearchResults,
  showSearchResultsView,
  filterByRoomType
} from './dom-updates';

import {
  searchByDate
} from './bookings';

import flatpickr from 'flatpickr';

// * GLOBAL VARIABLES * //
let customers, bookings, rooms, selectedDate, availRooms;
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

// Event Listeners
window.addEventListener('load', () => {
  flatpickr(dateField, {
    minDate: 'today',
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y/m/d"
  });
  Promise.all([getCustomersData(), getBookingsData(), getRoomsData()])
    .then(data => {
      customers = data[0].customers
      bookings = data[1].bookings
      rooms = data[2].rooms
      setDashboard(customers[1], bookings, rooms)
    });
});

dateSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  dateSearch.reset();
  if (dateField.value) {
    selectedDate = dateField.value;
    availRooms = searchByDate(bookings, rooms, selectedDate);
    showSearchResultsView();
    displaySearchResults(availRooms);
  };
});

filter.addEventListener('change', (event) => {
  if (event.target.value === 'any') {
    displaySearchResults(availRooms);
  } else {
    filterByRoomType(availRooms, event.target.value)
  }
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
  availRooms
};