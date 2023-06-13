const sampleData = {
  bookings: [
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
    },
    {
      "id": "0000",
      "userID": 3,
      "date": "2023/10/31",
      "roomNumber": 5
    },
    {
      "id": "1234",
      "userID": 3,
      "date": "2023/10/31",
      "roomNumber": 4
    },
    {
      "id": "2345",
      "userID": 3,
      "date": "2023/10/31",
      "roomNumber": 3
    },
    {
      "id": "3456",
      "userID": 3,
      "date": "2023/10/31",
      "roomNumber": 2
    },
    {
      "id": "4567",
      "userID": 3,
      "date": "2023/10/31",
      "roomNumber": 1
    }
  ],
  rooms: [
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
    },
    {
      "number": 5,
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 2,
      "costPerNight": 228.4
    }
  ],
  customers: [
    {
      "id": 1,
      "name": "Leatha Ullrich",
      "bookings": [
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
    },
    {
      "id": 5,
      "name": "Rocio Schuster",
      "bookings": [
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
    },
    {
      "id": 6,
      "name": "Rachel Prather",
      "bookings": null
    },
    {
      "id": 3,
      "name": "Halloween Convention",
      "bookings": [
        {
          "id": "0000",
          "userID": 3,
          "date": "2023/10/31",
          "roomNumber": 5
        },
        {
          "id": "1234",
          "userID": 3,
          "date": "2023/10/31",
          "roomNumber": 4
        },
        {
          "id": "2345",
          "userID": 3,
          "date": "2023/10/31",
          "roomNumber": 3
        },
        {
          "id": "3456",
          "userID": 3,
          "date": "2023/10/31",
          "roomNumber": 2
        },
        {
          "id": "4567",
          "userID": 3,
          "date": "2023/10/31",
          "roomNumber": 1
        }
      ]
    },
    {
      "id": 21,
      "name": "Bell Schwartz",
      "bookings": null
    }
  ]
};

export { sampleData }
