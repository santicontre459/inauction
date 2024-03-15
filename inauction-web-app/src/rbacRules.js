const rules = {
  isHost: {
    static: [
      'event:create',
      'event:draft',
      'bidder:invitations',
      'bidder:invite'
    ],
  },
  isHostAdmin: {
    static: [],
  },
  isHostExpert: {
    static: [],
  },
  isBidder: {
    static: [],
  },
  isBidderAdmin: {
    static: [],
  },
  isBidderExpert: {
    static: [],
  }

    // writer: {
    //   static: ['posts:list', 'posts:create', 'users:getSelf', 'home-page:visit', 'dashboard-page:visit'],
    //   dynamic: {
    //     'posts:edit': ({ userId, postOwnerId }) => {
    //       if (!userId || !postOwnerId) return false;
    //       return userId === postOwnerId;
    //     },
    //   },
    // },
    // admin: {
    //   static: [
    //     'posts:list',
    //     'posts:create',
    //     'posts:edit',
    //     'posts:delete',
    //     'users:get',
    //     'users:getSelf',
    //     'home-page:visit',
    //     'dashboard-page:visit'
    //   ],
    // },
  };

  export default rules;
