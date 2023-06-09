const bookings = [
  {
    "id": "1180820",
    "userID": 1,
    "date": "2018/08/20",
    "roomNumber": 2
  },
  {
    "id": "5131202",
    "userID": 5,
    "date": "2013/12/02",
    "roomNumber": 4
  },
  {
    "id": "1160422",
    "userID": 1,
    "date": "2025/12/25",
    "roomNumber": 4
  },
  {
    "id": "1211004",
    "userID": 1,
    "date": "2021/10/04",
    "roomNumber": 2
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
    "id": "1220422",
    "userID": 1,
    "date": "2022/04/22",
    "roomNumber": 3
  },  
  {
    "id": "5200311",
    "userID": 5,
    "date": "2020/03/11",
    "roomNumber": 1
  }
]

const bookings1 = [
  {
    "id": "1180820",
    "userID": 1,
    "date": "2018/08/20",
    "roomNumber": 2
  },
  {
    "id": "1160422",
    "userID": 1,
    "date": "2025/12/25",
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
]

const bookings5 = [
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
]

const rooms = [
  {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
  },
  {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
  },
  {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
  },
  {
    "number": 4,
    "roomType": "junior suite",
    "bidet": true,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 429.44
  }
]

const availRooms1 = [
  {
    "number": 1,
    "roomType": "residential suite",
    "bidet": true,
    "bedSize": "queen",
    "numBeds": 1,
    "costPerNight": 358.4
  },
  {
    "number": 2,
    "roomType": "suite",
    "bidet": false,
    "bedSize": "full",
    "numBeds": 2,
    "costPerNight": 477.38
  },
  {
    "number": 3,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "king",
    "numBeds": 1,
    "costPerNight": 491.14
  }
]

const allRoomsBooked = [
  {
    "id": "5131202",
    "userID": 8,
    "date": "2023/10/31",
    "roomNumber": 4
  },
  {
    "id": "5190629",
    "userID": 12,
    "date": "2023/10/31",
    "roomNumber": 3
  },
  {
    "id": "5230501",
    "userID": 4,
    "date": "2023/10/31",
    "roomNumber": 2
  },
  {
    "id": "5200311",
    "userID": 1,
    "date": "2023/10/31",
    "roomNumber": 1
  }
]

const customers = [
  {
    "id": 1,
    "name": "Leatha Ullrich"
  },
  {
    "id": 5,
    "name": "Rocio Schuster"
  },
  {
    "id": 6,
    "name": "Rachel Prather"
  }
]

export { 
  bookings, 
  bookings1, 
  bookings5, 
  rooms, 
  availRooms1,
  allRoomsBooked,
  customers
}