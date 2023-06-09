import {
  setDashboard
} from './dom-updates'

const getCustomersData = () => {
  return fetch('http://localhost:3001/api/v1/customers')
  .then(response => checkForError(response))
  .catch(error => alert(`${error.message}`))
};

const getBookingsData = () => {
  return fetch('http://localhost:3001/api/v1/bookings')
  .then(response => checkForError(response))
  .catch(error => alert(`${error.message}`))
};

const getRoomsData = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
  .then(response => checkForError(response))
  .catch(error => alert(`${error.message}`))
};

const checkForError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`${response.statusText}`);
  };
};

export {
  getCustomersData,
  getBookingsData,
  getRoomsData,
}