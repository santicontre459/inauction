import React, { useEffect, useState } from 'react';
import { message } from 'antd'
import Autocomplete from 'react-google-autocomplete';
import Svg_curloc from '../../assets/svgs/markers/current_location.svg';
import './LocationInput.less';
import config from '../../api/config';
import { extractCityInfo } from '../../util/common';
import { checkLocationPermission, getCurrentLocation, getAddressByCoordinates } from '../../util/location';

const LocationInput = ({ defaultInput, placeholder, style, onChange }) => {
    const [text, setText] = useState('');

    useEffect(() => {
        setText(defaultInput);
    }, [defaultInput]);

    const _setCurrentLocation = async () => {
        try {
            let hasPermission = await checkLocationPermission();
            if (hasPermission) {
                const location = await getCurrentLocation();
                if (location) {
                    const address = await getAddressByCoordinates(location);
                    if (address) {
                        onChange(address);
                        setText(address.formatted_address || '');
                    }
                }
            }
        } catch (error) {
            message.error('Location is unavailable');
        }
    };

    return (
        <div style={style} className="input location-input">
            <Autocomplete
                className='ant-input'
                apiKey={config.GOOGLE_MAP_API_KEY}
                placeholder={placeholder}
                value={text}
                options={{
                    types: ['geocode'],
                    componentRestrictions: { country: ['al', 'xk'] }
                }}
                onChange={(e) => {
                    setText(e.target.value);
                }}
                onPlaceSelected={(place) => {
                    let data = extractCityInfo(place.address_components);

                    onChange({
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng(),
                        formatted_address: place.formatted_address || '',
                        street: data.street,
                        building: data.building,
                        country: data.country,
                        city: data.city
                    });
                    setText(place.formatted_address || '');
                }}
            />
            <img
                className=''
                src={Svg_curloc}
                onClick={() => {
                    _setCurrentLocation();
                }} />
        </div>
    );
};

function arePropsEqual(prevProps, nextProps) {
    return (
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.defaultInput === nextProps.defaultInput &&
        prevProps.onChange === nextProps.onChange
    );
}

export default React.memo(LocationInput, arePropsEqual);
