import Geocode from 'react-geocode';
import { extractCityInfo } from './common';
 
export const checkLocationPermission = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      resolve('granted');
    } else {
      reject('Not available');
    }
    // if (navigator.permissions) {
    //   navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
    //     if (result.state === 'granted') {
    //       resolve(result.state);
    //     } else if (result.state === 'prompt') {
    //       resolve(result.state);
    //     } else if (result.state === 'denied') {
    //       reject('denied');
    //     }
    //   });
    // } else {
    //   reject('Not available');
    // }
  });
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
          reject(error);
        },
        {
          timeout: 15000
        }
      );
    } else {
      reject('Not available');
    }
  });
};

export const getAddressByCoordinates = ({ latitude, longitude }) => {
  return new Promise((resolve, reject) => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;

        let data = extractCityInfo(response.results[0].address_components);

        resolve({
          latitude: latitude,
          longitude: longitude,
          formatted_address: address || '',
          street: data.street,
          building: data.building,
          country: data.country,
          city: data.city
        });
      },
      (error) => {
        console.error('Geocode.fromLatLng', error);
        reject(error);
      }
    );
  });
};
