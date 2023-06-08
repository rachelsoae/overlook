import chai from 'chai';
const expect = chai.expect;
import { bookings, rooms, customers } from '../src/sample-data'
import { getBookings } from '../src/bookings'

describe('Should access customer\'s information', () => {
  const customer1 = customers[0];
  const customer2 = customers[1];
  const allBookings = bookings;

  it('Should list all user\'s previous bookings', () => {
    const customer1Bookings = getBookings(allBookings, customer1)
    
    expect(customer1Bookings).to.deep.equal([
      {
        "id": "1180820",
        "userID": 1,
        "date": "2018/08/20",
        "roomNumber": 3
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
        "roomNumber": 1
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
        "roomNumber": 3
      }
    ]);
  });
});
