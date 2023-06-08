const getBookings = (bookingsArray, customer) => {
  return bookingsArray.filter(booking => booking.userID === customer.id)
}

const getTotalCost = (roomsArray, customerBookings) => {
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

export { getBookings, getTotalCost }