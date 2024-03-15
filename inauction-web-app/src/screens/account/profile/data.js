import React from "react";
import { Avatar } from "antd";

const userImageList = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150x150',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150x150',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150x150',

  },
  {
    id: 4,
    image: 'https://via.placeholder.com/150x150',
    name: 'Mila Alba',
    rating: '5.0',
    deals: '27 Deals'
  },
]

export const aboutList = [
  {
    id: 1,
    title: 'Works at',
    icon: 'company',
    userList: '',
    desc: ['G-axon Tech Pvt. Ltd.']
  },
  {
    id: 2,
    title: 'Birthday',
    icon: 'birthday-new',
    userList: '',
    desc: ['Oct 25, 1984']
  },
  {
    id: 3,
    title: 'Went to',
    icon: 'graduation',
    userList: '',
    desc: ['Oxford University']
  },
  {
    id: 4,
    title: 'Lives in London',
    icon: 'home',
    userList: '',
    desc: ['From Switzerland']
  },
  {
    id: 5,
    title: '4 Family Members',
    icon: 'family',
    userList: [<ul className="gx-list-inline gx-mb-0" key={1}>
      {userImageList.map((user, index) =>
        <li className="gx-mb-2" key={index}>
          <Avatar className="gx-size-30" src={user.image}/>
        </li>
      )
      }
    </ul>],
    desc: ''
  },
];

export const eventList = [
  {
    id: 1,
    image: 'https://via.placeholder.com/575x480',
    title: 'Sundance Film Festival.',
    address: 'Downsview Park, Toronto, Ontario',
    date: 'Feb 23, 2019',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/575x480',
    title: 'Underwater Musical Festival.',
    address: 'Street Sacramento, Toronto, Ontario',
    date: 'Feb 24, 2019',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/575x480',
    title: 'Village Feast Fac',
    address: 'Union Street Eureka',
    date: 'Oct 25, 2019',
  }
];

export const contactList = [
  {
    id: 1,
    title: 'Email',
    icon: 'email',
    desc: [<span className="gx-link" key={1}>kiley.brown@example.com</span>]
  },
  {
    id: 2,
    title: 'Web page',
    icon: 'phone',
    desc: [<span className="gx-link" key={2}>example.com</span>]
  }, {
    id: 3,
    title: 'Phone',
    icon: 'phone',
    desc: ['+1-987 (454) 987']
  },
];


export const friendList = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150x150',
    name: 'Chelsea Johns',
    status: 'online'

  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150x150',
    name: 'Ken Ramirez',
    status: 'offline'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/150x150',
    name: 'Chelsea Johns',
    status: 'away'

  },
  {
    id: 4,
    image: 'https://via.placeholder.com/150x150',
    name: 'Ken Ramirez',
    status: 'away'
  },
];

export const recentActivity = [
  {
    id: 1,
    day: 'Today',
    tasks: [
      {
        id: 1,
        name: 'Mila Alba',
        title: [<span className="gx-link" key={1}>Mila Alba</span>, ' left a 5 star review on ',
          <span className="gx-link" key={2}>Albama’s House</span>],
        avatar: 'https://via.placeholder.com/150x150',
        imageList: [],
      },
      {
        id: 2,
        name: 'Bob Builder',
        title: ['Callback request from ', <span key={3} className="gx-link">Bob Builder</span>, ' for the property ',
          <span className="gx-link" key={4}>Dimitri House</span>],
        avatar: 'https://via.placeholder.com/150x150',
        imageList: [],
      },
      {
        id: 3,
        name: 'Tom Moody',
        title: ['Congratulations to ', <span key={5} className="gx-link">Tom Moody</span>,
          ' for joining 10+ club '],
        avatar: 'https://via.placeholder.com/150x150',
        imageList: [],
      },
      {
        id: 4,
        name: 'Norman Dolphi',
        title: ['Norman Dolphi is looking for a house in New Jersy, USA'],
        avatar: '',
        imageList: [],
      }
    ]
  },
  {
    id: 2,
    day: 'Yesterday',
    tasks: [
      {
        id: 5,
        name: 'Kily Johns',
        title: ['Agent ',
          <span key={6} className="gx-link">Kily Johns</span>, ' has added 7 new photos to the property ',
          <span key={7} className="gx-link">Albama’s House</span>],
        avatar: '',
        imageList: ['https://via.placeholder.com/150x150', 'https://via.placeholder.com/150x150', 'https://via.placeholder.com/150x150'],
      },
      {
        id: 6,
        name: 'Tom Moody',
        title: ['Welcome to a new agent ', <span className="gx-link" key={8}>Tom Moody in the Company</span>],
        avatar: 'https://via.placeholder.com/150x150',
        imageList: [],
      },
      {
        id: 7,
        name: 'Oliver Shorter',
        title: [<span key={9} className="gx-link">Oliver Shorter</span>, ' is looking for an office space in ',
          <span key={10} className="gx-link">Colorado, USA</span>],
        avatar: 'https://via.placeholder.com/150x150',
        imageList: [],
      }
    ]
  }];

