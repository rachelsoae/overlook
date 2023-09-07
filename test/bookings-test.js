import chai from 'chai';
const expect = chai.expect;
import { sampleData } from '../src/sample-data'
import { 
  getBookings, 
  getTotalCost, 
  searchByDate, 
  searchByRoomType,
  configDate,
  getTodaysDate,
  sortByDate
} from '../src/bookings'

describe('Bookings per customer', () => {
  const leatha = sampleData.customers[0];
  const rocio = sampleData.customers[1];
  const rachel = sampleData.customers[2];
  const bookings = sampleData.bookings;
  
  it('Should list all user\'s previous bookings', () => {
    const leathasBookings = getBookings(bookings, leatha); 
    expect(leathasBookings).to.deep.equal(leatha.bookings);
  });

  it('Should be able to list bookings for a different user', () => {
    const rociosBookings = getBookings(bookings, rocio);
    expect(rociosBookings).to.deep.equal(rocio.bookings);
  });

  it('Should return a message if the user has no bookings', () => {    
    const rachelsBookings = getBookings(bookings, rachel);
    expect(rachelsBookings).to.equal('You don\'t have any bookings yet. Book your first stay today!');
  });
});

describe('Cost per customer', () => {
  const leatha = sampleData.customers[0];
  const rocio = sampleData.customers[1];
  const rachel = sampleData.customers[2];
  const bookings = sampleData.bookings;
  const rooms = sampleData.rooms;

  it('Should be able to calculate the total cost of bookings for a user', () => {
    const leathasBookings = getBookings(bookings, leatha);
    const leathasCost = getTotalCost(rooms, leathasBookings);
    expect(leathasCost).to.equal('1875.34');
  });

  it('Should be able to calculate the total cost for a different user', () => {
    const rociosBookings = getBookings(bookings, rocio);
    const rociosCost = getTotalCost(rooms, rociosBookings);
    expect(rociosCost).to.equal('1623.62');
  });

  it('Should return 0 if the user has no bookings', () => {
    const rachelsBookings = getBookings(bookings, rachel);
    const rachelsCost = getTotalCost(rooms, rachelsBookings);
    expect(rachelsCost).to.equal(0);
  });
});

describe('Search rooms', () => {
  const bookings = sampleData.bookings;
  const rooms= sampleData.rooms;
  
  it('Should return a list of rooms available on a given date', () => {
    const xmasRooms = searchByDate(bookings, rooms, '2025/12/25');
    expect(xmasRooms).to.deep.equal([rooms[0], rooms[1], rooms[2], rooms[4]]);
  });

  it('Should return a message if no rooms are available', () => {
    const halloweenRooms = searchByDate(bookings, rooms, '2023/10/31');
    expect(halloweenRooms).to.deep.equal('We\'re terribly sorry - all rooms are booked for the date you have selected. Please book a different date.');
  });

  it('Should return a list of rooms given a room type', () => {
    const onlyJuniorSuites = searchByRoomType(rooms, 'junior suite');
    expect(onlyJuniorSuites).to.deep.equal([rooms[3]]);
  });

  it('Should return a different list of rooms given a different room type', () => {
    const onlyResidentialSuites = searchByRoomType(rooms, 'residential suite');
    expect(onlyResidentialSuites).to.deep.equal([rooms[0], rooms[4]]);
  });

  it('Should return a message if no rooms of the selected type are available', () => {
    const xmasRooms = searchByDate(bookings, rooms, '2025/12/25')
    const onlyJuniorSuites = searchByRoomType(xmasRooms, 'junior suite');
    expect(onlyJuniorSuites).to.deep.equal(`We\'re terribly sorry - there are no rooms of that type available for the date you have selected. Please select a different room type, or book a different date.`);
  });
});

describe('Dates', () => {
  it('Should return a date in the correct format', () => {
    const longDate = 'June 29, 2023';
    const dataDate = configDate(longDate);
    expect(dataDate).to.equal('2023/06/29');
  });

  it('Should sort a user\'s bookings in reverse chronological order', () => {
    const leathasBookings = sampleData.customers[0].bookings
    // const rocio = sampleData.customers[1];
    // const rachel = sampleData.customers[2];
    // const bookings = sampleData.bookings;

    const sortedBookings = sortByDate(leathasBookings)
    expect(sortedBookings).to.deep.equal([
      {
        "id": "1160422",
        "userID": 1,
        "date": "2025/12/25",
        "roomNumber": 4
      },
      {
        "id": "1220422",
        "userID": 1,
        "date": "2022/04/22",
        "roomNumber": 3
      },
      {
        "id": "1211004",
        "userID": 1,
        "date": "2021/10/04",
        "roomNumber": 2
      },
      {
        "id": "1180820",
        "userID": 1,
        "date": "2018/08/20",
        "roomNumber": 2
      }
    ])
  })
});