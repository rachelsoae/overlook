import chai from 'chai';
const expect = chai.expect;
import { bookings, rooms, customers } from '../src/sample-data'
import { getBookings, getTotalCost } from '../src/bookings'

const customer1 = customers[0];
const customer2 = customers[1];
const customer3 = customers[2];
const allBookings = bookings;

describe('Bookings per customer', () => {
  it('Should list all user\'s previous bookings', () => {
    const customer1Bookings = getBookings(allBookings, customer1)
    
    expect(customer1Bookings).to.deep.equal([
      {
        "id": "1180820",
        "userID": 1,
        "date": "2018/08/20",
        "roomNumber": 2
      },
      {
        "id": "1160422",
        "userID": 1,
        "date": "2016/04/22",
        "roomNumber": 4
      },
      {
        "id": "1211004",
        "userID": 1,
        "date": "2021/10/04",
        "roomNumber": 2
      },
      {
        "id": "1220422",
        "userID": 1,
        "date": "2022/04/22",
        "roomNumber": 3
      }
    ]);
  });

  it('Should be able to list bookings for a different user', () => {
    const customer2Bookings = getBookings(allBookings, customer2)

    expect(customer2Bookings).to.deep.equal([
      {
        "id": "5131202",
        "userID": 5,
        "date": "2013/12/02",
        "roomNumber": 4
      },
      {
        "id": "5190629",
        "userID": 5,
        "date": "2019/06/29",
        "roomNumber": 1
      },
      {
        "id": "5230501",
        "userID": 5,
        "date": "2023/05/01",
        "roomNumber": 2
      },
      {
        "id": "5200311",
        "userID": 5,
        "date": "2020/03/11",
        "roomNumber": 1
      }
    ]);
  });

  it('Should return a message if the user has no bookings', () => {    
    const customer3Bookings = getBookings(allBookings, customer3)

    expect(customer3Bookings).to.equal('You don\'t have any bookings yet. Book your first stay today!')
  });
});

describe('Cost per customer', () => {
  const allRooms = rooms;

  it('Should be able to calculate the total cost of bookings for a user', () => {
    const customer1Bookings = getBookings(allBookings, customer1)

    const customer1Cost = getTotalCost(allRooms, customer1Bookings)

    expect(customer1Cost).to.equal('1875.34')
  });

  it('Should be able to calculate the total cost for a different user', () => {
    const customer2Bookings = getBookings(allBookings, customer2)

    const customer2Cost = getTotalCost(allRooms, customer2Bookings)

    expect(customer2Cost).to.equal('1623.62')
  });

  it('Should return 0 if the user has no bookings', () => {
    const customer3Bookings = getBookings(allBookings, customer3);

    const customer3Cost = getTotalCost(allRooms, customer3Bookings);

    expect(customer3Cost).to.equal(0);
  })
});
