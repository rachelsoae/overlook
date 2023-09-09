const getData = (url1, url2 = null) => {
  const url = url2 ? `${url1}/${url2}` : url1;
  return fetch(`https://overlook-api-rachelsoae.vercel.app/api/v1/${url}`)
  .then(response => checkForError(response))
  .catch(error => alert(`${error.message}`))
}

const bookRoom = (userID, selectedDate, roomNumber) => {
  
  return fetch('https://overlook-api-rachelsoae.vercel.app/api/v1/bookings', {
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
  .then(() => getData('bookings')) 
  .catch(error => alert(`${error.message}`))
};

const checkForError = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    console.log(response)
    throw new Error('We\'re sorry, there\'s been an error.');
  };
};

export {
  getData,
  bookRoom
}