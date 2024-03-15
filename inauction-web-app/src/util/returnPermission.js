const returnPermission = user => {

  // `isHost` Permissions
  if (
    user.role.roleName === 'Host'
    && user.role.id === 2
  ) {
    return 'isHost';
  }

  if (
    user.role.roleName === 'Host'
    && user.role.id === 2
    && user.subRole.roleName === 'Admin'
    && user.subRole.id === 7
  ) {
    return 'isHostAdmin';
  }

  if (
    user.role.roleName === 'Host'
    && user.role.id === 2
    && user.subRole.roleName === 'Expert'
    && user.subRole.id === 8
  ) {
    return 'isHostExpert';
  }

  // `isBidder` Permissions
  if (user.role.roleName === 'Bidder' && user.role.id === 3) {
    return 'isBidder';
  }

  if (
    user.role.roleName === 'Bidder'
    && user.role.id === 3
    && user.subRole.roleName === 'Admin'
    && user.subRole.id === 9
  ) {
    return 'isBidderAdmin';
  }

  if (
    user.role.roleName === 'Bidder'
    && user.role.id === 3
    && user.subRole.roleName === 'Expert'
    && user.subRole.id === 10
  ) {
    return 'isBidderExpert';
  }

  return 'noPermission'
};

export default returnPermission;
