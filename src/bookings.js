const getBookings = (bookingsArray, customer) => {
  let customerBookings = bookingsArray.filter(booking => booking.userID === customer.id)
  
  if (!customerBookings.length) {
    customerBookings = 'You don\'t have any bookings yet. Book your first stay today!'
  }

  return customerBookings;
}

const getTotalCost = (roomsArray, customerBookings) => {
  if (typeof customerBookings === 'string') {
    return 0;
  } else {
    const grandTotal = customerBookings.reduce((totalCost, booking) => {
      roomsArray.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalCost += room.costPerNight;
        }
      })
      return totalCost
    }, 0)
    return grandTotal.toFixed(2)
  }  
}

const searchByDate = (bookingsArray, roomsArray, date) => {
  const unavailRooms = bookingsArray.filter(booking => booking.date === date).map(booking => booking.roomNumber)

  const availRooms = roomsArray.filter(room => !unavailRooms.includes(room.number))

  return availRooms;
}

export { getBookings, getTotalCost, searchByDate }