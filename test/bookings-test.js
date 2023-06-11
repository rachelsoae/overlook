import chai from 'chai';
const expect = chai.expect;
import { sampleData } from '../src/sample-data'
import { getBookings, getTotalCost, searchByDate } from '../src/bookings'

describe('Bookings per customer', () => {
  const customers = sampleData.customers;
  const bookings = sampleData.bookings;
  
  it('Should list all user\'s previous bookings', () => {
    const leatha = customers[0];

    const leathasBookings = getBookings(bookings, leatha);
    
    expect(leathasBookings).to.deep.equal(leatha.bookings);
  });

  it('Should be able to list bookings for a different user', () => {
    const rocio = customers[1];

    const rociosBookings = getBookings(bookings, rocio);

    expect(rociosBookings).to.deep.equal(rocio.bookings);
  });

  it('Should return a message if the user has no bookings', () => {    
    const rachel = customers[2];

    const rachelsBookings = getBookings(bookings, rachel);

    expect(rachelsBookings).to.equal('You don\'t have any bookings yet. Book your first stay today!');
  });
});

describe('Cost per customer', () => {
  const customers = sampleData.customers;
  const bookings = sampleData.bookings;
  const rooms = sampleData.rooms;

  it('Should be able to calculate the total cost of bookings for a user', () => {
    const leatha = customers[0];
    const leathasBookings = getBookings(bookings, leatha);

    const leathasCost = getTotalCost(rooms, leathasBookings)

    expect(leathasCost).to.equal('1875.34')
  });

  it('Should be able to calculate the total cost for a different user', () => {
    const rocio = customers[1];
    const rociosBookings = getBookings(bookings, rocio);

    const rociosCost = getTotalCost(rooms, rociosBookings)

    expect(rociosCost).to.equal('1623.62')
  });

  it('Should return 0 if the user has no bookings', () => {
    const rachel = customers[2];
    const rachelsBookings = getBookings(bookings, rachel);

    const rachelsCost = getTotalCost(rooms, rachelsBookings)

    expect(rachelsCost).to.equal(0);
  })
});

describe('Search available rooms', () => {
  const bookings = sampleData.bookings
  const rooms= sampleData.rooms
  
  it('Should return a list of rooms available on a given date', () => {
    const date1 = '2025/12/25'

    const roomsAvailOnXmas = searchByDate(bookings, rooms, date1);

    expect(roomsAvailOnXmas).to.deep.equal([rooms[0], rooms[1], rooms[2]])
  });

  it('Should return a message if no rooms are available', () => {
    const date2 = '2023/10/31'

    const halloweenRooms = searchByDate(bookings, rooms, date2);

    expect(halloweenRooms).to.deep.equal('We\'re terribly sorry - all rooms are booked for the date you have selected. Please book a different date.')
  });

  it('Should return a list of rooms given a room type', () => {
    const onlyJuniorSuites = searchByRoomType('junior suite');

    expect(onlyJuniorSuites).to.deep.equal()
  })
})