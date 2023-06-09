// * IMPORTS * //
import './css/styles.css';

import './images/jr-suite.png'
import './images/res-suite.png'
import './images/suite.png'
import './images/single-room.png'

import {
  getCustomersData,
  getBookingsData,
  getRoomsData,
} from './api-calls'

import {
  setDashboard
} from './dom-updates'

import flatpickr from 'flatpickr'

// * GLOBAL VARIABLES * //
let customers, bookings, rooms;

const yourBookings = document.querySelector('.bookings-list')
const yourBookingsCost = document.querySelector('.bookings-cost-insert')
const dateField = document.querySelector('.date-picker')

// Event Listeners
window.addEventListener('load', () => {
  Promise.all([getCustomersData(), getBookingsData(), getRoomsData()])
  .then(data => {
    customers = data[0].customers
    bookings = data[1].bookings
    rooms = data[2].rooms
    setDashboard(customers[1], bookings, rooms)
  });
  
});



export {
  customers,
  bookings,
  rooms,
  yourBookings,
  yourBookingsCost,
  dateField
}