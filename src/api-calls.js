const getAllCustomersData = () => {
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

const getUserData = (id) => {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
  .then(response => checkForError(response))
  .catch(error => alert(`${error.message}`))
};

const bookRoom = (userID, selectedDate, roomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      userID: userID, 
      date: selectedDate, 
      roomNumber: parseInt(roomNumber)
    }),
    headers: {
      'Content-Type':'application/json'
    }
  })
  .then(response => checkForError(response))
  .then(response => getBookingsData())
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
  getAllCustomersData,
  getBookingsData,
  getRoomsData,
  getUserData,
  bookRoom
}