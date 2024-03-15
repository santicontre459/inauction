export const getPhoneNumberWithPrefix = (phone_number) => {
    if (phone_number == null || phone_number == '') { return ['', '']; }

    let prefix = '';
    let number = '';
    if (phone_number.includes('+355')) {
        prefix = '+355';
        number = phone_number.substring(4);
    }
    else if (phone_number.includes('+383')) {
        prefix = '+383';
        number = phone_number.substring(4);
    }
    else if (phone_number.includes('+39')) {
        prefix = '+39';
        number = phone_number.substring(3);
    }
    return [prefix, number]
}


export const extractCityInfo = (addressComp) => {
    let street = '';
    let city = '';
    let country = '';
    let building = '';
    for (let i = 0; i < addressComp.length; i++) {
      // PrintLog(details.address_components[i].types, details.address_components[i].long_name)
      // PrintLog('details.geometry.location', details.geometry.location)
      if (addressComp[i].types.includes('neighborhood') || addressComp[i].types.includes('route')) {
        street = addressComp[i].long_name;
      }
      // building
      if (addressComp[i].types.includes('premise') || addressComp[i].types.includes('floor')) {
        building = addressComp[i].long_name;
      }
      // city
      if (addressComp[i].types.includes('locality') || addressComp[i].types.includes('postal_town')) {
        city = addressComp[i].long_name;
      }
      // country
      if (addressComp[i].types.includes('country')) {
        country = addressComp[i].long_name;
      }
    }
  
    return {
      street,
      city,
      country,
      building
    };
  };

  /**
 * Adds space every third place to the number for legibility
 * @param value number
 */
export function numberWithSpaces(value) {
  let parts = value.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}

/**
* Formats a value and currency into "11,1111.00 CUR"
* @param value value to format
* @param currency currency value, defaults to empty
* @param showBeforeValue whether the currency should be displayed before the value
*/
export function formatCurrency(value, currency, showBeforeValue) {
  let ret = '';
  if (isNaN(value)) return 0;
  ret += value.toFixed(2);
  if (currency) {
      ret = showBeforeValue ? `${currency} ${ret}` : `${ret} ${currency}`;
  }
  return numberWithSpaces(ret);
}


// check if logged user is Host (Admin or Expert Permissions)
export const isHost = (user) => {
  console.log('is host ', user)
  const { role } = user;
  return (
    role.id === 2
    && role.roleName === 'Host'
  )
};

// check if logged user is Bidder (Admin or Expert Permissions)
export const isBidder = (user) => {
  console.log('is bidder ', user)
  const { role } = user;
  return (
    role.id === 3
    && role.roleName === 'Bidder'
  )
};

// check if logged user Host or Bidder has Admin Permissions
export const isAdmin = (user) => {
  console.log('is admin ', user)
  const { subrole } = user;
  return (
    (subrole.id === 7 || subrole.id === 9)
    && subrole.roleName === 'Admin'
  )
};

// check if logged user Host or Bidder has Expert Permissions
export const isExpert = (user) => {
  console.log('is expert ', user)
  const { subrole } = user;
  return (
    (subrole.id === 8 || subrole.id === 10)
    && subrole.roleName === 'Expert'
  )
};

export const getFlattenActivities = (data = []) => {
  let activities = [];
  data.forEach(category => {
    if (category.activities) {
      let tmp = {
        category_id: category.id,
        category_name : category.name,
        category_code : category.code,
      }
      category.activities.forEach(activity => {
        if (activity) {
          tmp = {...tmp, 
            activity_id: activity.id,
            activity_name : activity.name,
            activity_code : activity.code,
          }
          activities.push(tmp);
        }
      })
    }
  });
  return activities;
}