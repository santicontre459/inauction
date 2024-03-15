import React from "react";

export const taskList = [
  {
    id: 1,
    title: 'Complete Event 1',
    completed: false,
    user: {
      projectName: 'Event 1',
      avatar: 'https://via.placeholder.com/150x150'
    },
    dueDate: 'Tomorrow',
    tags: [1, 2]
  }, {
    id: 2,
    title: 'Complete Event 2',
    completed: false,
    user: {
      projectName: 'Event 2',
      avatar: 'https://via.placeholder.com/150x150'
    },
    dueDate: 'Today',
    tags: [2, 4]
  }, {
    id: 3,
    title: 'Complete Event 3',
    completed: false,
    user: {
      projectName: 'Event 3',
      avatar: 'https://via.placeholder.com/150x150'
    },
    dueDate: '21 Jul',
    tags: [1, 2, 3]
  }, {
    id: 4,
    title: 'Complete Event 4',
    completed: false,
    user: {
      projectName: 'Event 4',
      avatar: 'https://via.placeholder.com/150x150'
    },
    dueDate: '23 Jul',
    tags: [2, 3, 4]
  }, {
    id: 5,
    title: 'Complete Event 5',
    completed: false,
    user: {
      projectName: 'Event 5',
      avatar: 'https://via.placeholder.com/150x150'
    },
    dueDate: '1 Aug',
    tags: [2, 4]
  }];

export const recentActivity = [
  {
    id: 1,
    day: 'Today',
    tasks: [
      {
        id: 1,
        name: 'Eglon Metalia',
        title: [<span className="gx-link" key={1}>Eglon Metalia</span>, ' left a 5 star review on ',
          <span className="gx-link" key={2}>iNegotio Tool</span>],
        avatar: 'https://via.placeholder.com/150x150',
        imageList: [],
      },
      {
        id: 2,
        name: 'Eglon Metalia',
        title: ['Callback request from ', <span className="gx-link" key={3}>iNegotio</span>, ' for the property ',
          <span className="gx-link" key={4}>iNegotio</span>],
        avatar: '',
        imageList: [],
      },
      {
        id: 3,
        name: 'Eglon Metalia',
        title: ['Congratulations to ', <span className="gx-link" key={5}>iNegotio</span>,
          ' for joining event '],
        avatar: '',
        imageList: [],
      },
      {
        id: 4,
        name: 'Eglon Metalia',
        title: ['Eglon Metalia completed a task, Super'],
        avatar: '',
        imageList: [],
      },
    ]
  },
  {
    id: 2,
    day: 'Yesterday',
    tasks: [
      {
        id: 5,
        name: 'Eglon Metalia SHPK',
        title: ['Welcome to a new bidder ', <span className="gx-link" key={8}>Eglon Metalia SHPK SHPK</span>],
        avatar: '',
        imageList: [],
      },
      {
        id: 6,
        name: '4 AM',
        title: ['Welcome to a new bidder ', <span className="gx-link" key={8}>4 AM SHPK</span>],
        avatar: '',
        imageList: [],
      }
    ]
  }];

export const ticketList = [
  {
    id: 1,
    avatar: 'https://via.placeholder.com/150x150',
    title: 'Need a quick support on setting',
    description: [<span className="gx-link" key={13}>Joy Parish</span>, "  created ticket 15 mins ago"],
    status: 2
  }, {
    id: 2,
    avatar: 'https://via.placeholder.com/150x150',
    title: 'Pre-sale query about the product',
    description: [<span key={14} className="gx-link">You</span>, " replied 2 days ago"],
    status: 1
  }, {
    id: 3,
    avatar: 'https://via.placeholder.com/150x150',
    title: 'Regarding customization service',
    description: [<span key={15} className="gx-link">Joy Parish</span>, " replied 2 days ago"],
    status: 4
  }
];
export const taskStatus = [
  {
    id: 1,
    title: 'Critical',
    color: 'red'
  }, {
    id: 2,
    title: 'High',
    color: 'orange'
  }, {
    id: 3,
    title: 'Medium',
    color: 'green'
  }, {
    id: 4,
    title: 'Low',
    color: 'light-grey'
  }
];
export const taskTags = [
  {
    id: 1,
    name: 'Event',
    color: 'red',
  }, {
    id: 2,
    name: 'Review',
    color: 'green',
  }, {
    id: 3,
    name: 'Publish',
    color: 'blue',
  }, {
    id: 4,
    name: 'Verify',
    color: 'orange',
  }];
export const eventAudience = [
  {name: '1', thisYear: 0, lastYear: 0},
  {name: '2', thisYear: 0, lastYear: 1},
  {name: '3', thisYear: 5, lastYear: 2},
  {name: '4', thisYear: 10, lastYear: 0},
  {name: '5', thisYear: 4, lastYear: 1},
  {name: '6', thisYear: 16, lastYear: 3},
  {name: '7', thisYear: 5, lastYear: 1},
  {name: '8', thisYear: 11, lastYear: 5},
  {name: '9', thisYear: 6, lastYear: 2},
  {name: '10', thisYear: 11, lastYear: 3},
  {name: '11', thisYear: 30, lastYear: 2},
  {name: '12', thisYear: 10, lastYear: 1},
  {name: '13', thisYear: 13, lastYear: 0},
  {name: '14', thisYear: 4, lastYear: 2},
  {name: '15', thisYear: 3, lastYear: 8},
  {name: '16', thisYear: 1, lastYear: 0},
  {name: '17', thisYear: 0, lastYear: 0},
];

export const totalSaleData = [
  {name: 'JAN', price: 600},
  {name: 'FEB', price: 3398},
  {name: 'MAR', price: 1200},
  {name: 'APR', price: 4908},
  {name: 'MAY', price: 2908},
];

export const totalRevenueData = [
  {name: 'JAN', thisYear: 60},
  {name: 'FEB', thisYear: 90},
  {name: 'MAR', thisYear: 50},
  {name: 'APR', thisYear: 75},
  {name: 'MAY', thisYear: 60},
  {name: 'JUN', thisYear: 85},
  {name: 'JUL', thisYear: 20},
  {name: 'AUG', thisYear: 75},
  {name: 'SEP', thisYear: 60},
  {name: 'OCT', thisYear: 40},
  {name: 'NOV', thisYear: 75},
  {name: 'DEC', thisYear: 25},
];

export const trafficData = [
  {name: 'Page A', value: 0},
  {name: 'Page B', value: 2000},
  {name: 'Page C', value: 600},
  {name: 'Page D', value: 4400},
  {name: 'Page D', value: 900},
  {name: 'Page H', value: 4860},
];
