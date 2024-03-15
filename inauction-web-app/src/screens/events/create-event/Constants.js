import React from "react";

export const timeFormat = "YYYY-MM-DD HH:mm:ss";
export const steps = [
    {
        title: "Category",
        content: "category-content"
    }, {
        title: "Settings",
        content: "settings-content"
    }, {
        title: "Documents",
        content: "document-content"
    }, {
        title: "Submit",
        content: "invite-content"
    }
];
export const eventTypes = {
    RFQ: 0,
    OA: 1,
    NONE: 2
};
export const currency = [
    {
        label: "ALL",
        value: "all"
    },
    {
        label: "GBP",
        value: "gdp"
    },
    {
        label: "EUR",
        value: "eur"
    },
    {
        label: "CHF",
        value: "chf"
    },
    {
        label: "USD",
        value: "usd"
    }
];
export const defineBudgetOptions = [
    {label: "Yes", value: true},
    {label: "No", value: false}
];
export const bidDirection = [
    { label: "Reverse", value: 0 },
    { label: "Forward", value: 1 }
];
export const sealResultTypeOptions = [
    {label: "Yes", value: true},
    {label: "No", value: false}
];
export const rfqWeightingOptions = [
    {label: "Yes", value: 1},
    {label: "No", value: 0}
];
export const weightingOptions = [
    {label: "No", value: 0},
    {label: "Weighting per Section", value: 1},
    {label: "Weighting per Question", value: 2},
    {label: "Weighting per Section & Question", value: 3}
];
export const competitionInfo = [
    { label: "Ranking", value: 0 },
    { label: "Best Bid", value: 1 }
];
export const minDuration = [
    { label: "10 min", value: 0 },
    { label: "30 min", value: 1 },
    { label: "1 h", value: 2 },
    { label: "2 h", value: 3 }
];
export const closePeriod = [
    { label: "None", value: 0 },
    { label: "Last Minute", value: 1 }
];
export const onlineWeightingOptions = [
    {label: "Yes", value: 1},
    {label: "No", value: 0}
];
export const preQualification = [
    {label: "Needed", value: true},
    {label: "Not Needed", value: false}
];
export const categoryInvitationColumns = [
    {
        title: "Company Name",
        dataIndex: "companyName",
        key: "companyName"
    },
    {
        title: "NIPT",
        dataIndex: "nipt",
        key: "nipt"
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email"
    },
    {
        title: "Select Participant",
        dataIndex: "participant",
        key: "participant"
    }
];
export const biddersInvitationColumns = [
    {
        title: "Company Name",
        dataIndex: "companyName",
        key: "companyName"
    },
    {
        title: "NIPT",
        dataIndex: "nipt",
        key: "nipt"
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email"
    },
    {
        title: "Select Participant",
        dataIndex: "participant",
        key: "participant"
    }
];

export const questionsType = {
    YES_NO: {
        type: 'YES_NO',
        label: "Yes / No",
        options: [
            {label: 'Yes', score: '', fail: false},
            {label: 'No', score: '', fail: false},
        ]
    },
    ONE_CHOICE: {
        type: 'ONE_CHOICE',
        label: "Pick one from the list",
        options: [{label: '', score: '', fail: false}]
    },
    MULTI_CHOICE: {
        type: 'MULTI_CHOICE',
        label: "Multiple Choice",
        options: [{label: '', score: '', fail: false}],
    },
    DOCUMENT_UPLOAD: {
        type: 'DOCUMENT_UPLOAD',
        label: "Document Upload",
        options : []
    },
    PARAGRAPH_TEXT: {
        type: 'PARAGRAPH_TEXT',
        label: "Paragraph Text",
        maxNumberOfCharacters: undefined,
        options : []
    },
};

export const lotTypes = {
    MultipleLots: 1,
    SingleLot: 0,
};
export const lotState = {
    edit: "EDIT",
    submitted: "SUBMITTED"
};

export const UnitOfMeasurement = {
    meterSquare: "M2",
    meterCube: "M3",
    pieces: "Cope",
    kg: "Kg",
};

export const sliderMarks = (selectedValue) => {

    return {
        0: '0%',
        50: '50%',
        100: '100%',
        [selectedValue]: {
            style: {
                color: '#3F8C9E',
            },
            label: <strong>{selectedValue}%</strong>,
        },
    };
};

// Time Zones
export const timeZones =  [
    {
        status: 1,
        title: "(GMT-12:00) International Date Line West",
        value: "-12/International Date Line West"
    },
    {
        status: 1,
        title: "(GMT-11:00) Midway Island, Samoa",
        value: "-11/Midway Island, Samoa"
    },
    {
        status: 1,
        title: "(GMT-10:00) Hawaii",
        value: "-10/Hawaii"
    },
    {
        status: 1,
        title: "(GMT-09:00) Alaska",
        value: "-9/Alaska"
    },
    {
        status: 1,
        title: "(GMT-08:00) Tijuana, Baja California",
        value: "-8/Tijuana, Baja California"
    },
    {
        status: 1,
        title: "(GMT-07:00) Arizona",
        value: "-7/Arizona"
    },
    {
        status: 1,
        title: "(GMT-07:00) Chihuahua, La Paz, Mazatlan",
        value: "-7/Chihuahua, La Paz, Mazatlan"
    },
    {
        status: 1,
        title: "(GMT-07:00) Mountain Time (US & Canada)",
        value: "-7/Mountain Time (US & Canada)"
    },
    {
        status: 1,
        title: "(GMT-06:00) Central America",
        value: "-6/Central America"
    },
    {
        status: 1,
        title: "(GMT-06:00) Central Time (US & Canada)",
        value: "-6/Central Time (US & Canada)"
    },
    {
        status: 1,
        title: "(GMT-06:00) Guadalajara, Mexico City, Monterrey",
        value: "-6/Guadalajara, Mexico City, Monterrey"
    },
    {
        status: 1,
        title: "(GMT-06:00) Saskatchewan",
        value: "-6/Saskatchewan"
    },
    {
        status: 1,
        title: "(GMT-05:00) Bogota, Lima, Quito, Rio Branco",
        value: "-5/Bogota, Lima, Quito, Rio Branco"
    },
    {
        status: 1,
        title: "(GMT-05:00) Eastern Time (US & Canada)",
        value: "-5/Eastern Time (US & Canada)"
    },
    {
        status: 1,
        title: "(GMT-05:00) Indiana (East)",
        value: "-5/Indiana (East)"
    },
    {
        status: 1,
        title: "(GMT-04:00) Atlantic Time (Canada)",
        value: "-4/Atlantic Time (Canada)"
    },
    {
        status: 1,
        title: "(GMT-04:00) Caracas, La Paz",
        value: "-4/Caracas, La Paz"
    },

    {
        status: 1,
        title: "(GMT-04:00) Manaus",
        value: "-4/Manaus"
    },
    {
        status: 1,
        title: "(GMT-04:00) Santiago",
        value: "-4/Santiago"
    },
    {
        status: 1,
        title: "(GMT-03:30) Newfoundland",
        value: "-3.5/Newfoundland"
    },
    {
        status: 1,
        title: "(GMT-03:00) Brasilia",
        value: "-3/Brasilia"
    },
    {
        status: 1,
        title: "(GMT-03:00) Buenos Aires, Georgetown",
        value: "-3/Buenos Aires, Georgetown"
    },
    {
        status: 1,
        title: "(GMT-03:00) Greenland",
        value: "-3/Greenland"
    },
    {
        status: 1,
        title: "(GMT-03:00) Montevideo",
        value: "-3/Montevideo"
    },
    {
        status: 1,
        title: "(GMT-02:00) Mid-Atlantic",
        value: "-2/Mid-Atlantic"
    },
    {
        status: 1,
        title: "(GMT-01:00) Cape Verde Is.",
        value: "-1/Cape Verde Is."
    } ,
    {
        status: 1,
        title: "(GMT-01:00) Azores",
        value: "-1/Azores"
    },
    {
        status: 1,
        title: "(GMT+00:00) Casablanca, Monrovia, Reykjavik",
        value: "0/Casablanca, Monrovia, Reykjavik"
    },
    {
        status: 1,
        title: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London",
        value: "0/Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"
    },
    {
        status: 1,
        title: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
        value: "1/Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
    },
    {
        status: 1,
        title: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
        value: "1/Belgrade, Bratislava, Budapest, Ljubljana, Prague"
    },
    {
        status: 1,
        title: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris",
        value: "1/Brussels, Copenhagen, Madrid, Paris"
    },
    {
        status: 1,
        title: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
        value: "1/Sarajevo, Skopje, Warsaw, Zagreb"
    },
    {
        status: 1,
        title: "(GMT+01:00) West Central Africa" ,
        value: "1/West Central Africa"
    },
    {
        status: 1,
        title: "(GMT+02:00) Amman",
        value: "2/Amman"
    },
    {
        status: 1,
        title: "(GMT+02:00) Athens, Bucharest, Istanbul",
        value: "2/Athens, Bucharest, Istanbul"
    },
    {
        status: 1,
        title: "(GMT+02:00) Beirut",
        value: "2/Beirut"
    },
    {
        status: 1,
        title: "(GMT+02:00) Cairo",
        value: "2/Cairo"
    },
    {
        status: 1,
        title: "(GMT+02:00) Harare, Pretoria",
        value: "2/Harare, Pretoria"
    },
    {
        status: 1,
        title: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
        value: "2/Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
    },
    {
        status: 1,
        title: "(GMT+02:00) Jerusalem",
        value: "2/Jerusalem"
    },
    {
        status: 1,
        title: "(GMT+02:00) Minsk",
        value: "2/Minsk"
    },
    {
        status: 1,
        title: "(GMT+02:00) Windhoek",
        value: "2/Windhoek"
    },
    {
        status: 1,
        title: "(GMT+03:00) Kuwait, Riyadh, Baghdad",
        value: "3/Kuwait, Riyadh, Baghdad"
    },
    {
        status: 1,
        title: "(GMT+03:00) Moscow, St. Petersburg, Volgograd",
        value: "3/Moscow, St. Petersburg, Volgograd"
    },
    {
        status: 1,
        title: "(GMT+03:00) Nairobi",
        value: "3/Nairobi"
    },
    {
        status: 1,
        title: "(GMT+03:00) Tbilisi",
        value: "3/Tbilisi"
    },
    {
        status: 1,
        title: "(GMT+03:30) Tehran",
        value: "3.5/Tehran"
    },
    {
        status: 1,
        title: "(GMT+04:00) Abu Dhabi, Muscat",
        value: "4/Abu Dhabi, Muscat"
    },
    {
        status: 1,
        title: "(GMT+04:00) Baku",
        value: "4/Baku"
    },
    {
        status: 1,
        title: "(GMT+04:00) Yerevan",
        value: "4/Yerevan"
    },
    {
        status: 1,
        title: "(GMT+04:30) Kabul",
        value: "4.5/Kabul"
    },
    {
        status: 1,
        title: "(GMT+05:00) Yekaterinburg",
        value: "5/Yekaterinburg"
    },
    {
        status: 1,
        title: "(GMT+05:00) Islamabad, Karachi, Tashkent",
        value: "5/Islamabad, Karachi, Tashkent"
    },
    {
        status: 1,
        title: "(GMT+05:30) Sri Jayawardenapura",
        value: "5.5/Sri Jayawardenapura"
    },
    {
        status: 1,
        title: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi",
        value: "5.5/Chennai, Kolkata, Mumbai, New Delhi"
    },
    {
        status: 1,
        title: "(GMT+05:45) Kathmandu",
        value: "5.75/Kathmandu"
    },
    {
        status: 1,
        title: "(GMT+06:00) Almaty, Novosibirsk",
        value: "6/Almaty, Novosibirsk"
    },
    {
        status: 1,
        title: "(GMT+06:00) Astana, Dhaka",
        value: "6/Astana, Dhaka"
    },
    {
        status: 1,
        title: "(GMT+06:30) Yangon (Rangoon)",
        value: "6.5/Yangon (Rangoon)"
    },
    {
        status: 1,
        title: "(GMT+07:00) Bangkok, Hanoi, Jakarta",
        value: "7/Bangkok, Hanoi, Jakarta"
    },
    {
        status: 1,
        title: "(GMT+07:00) Krasnoyarsk",
        value: "7/Krasnoyarsk"
    },
    {
        status: 1,
        title: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
        value: "8/Beijing, Chongqing, Hong Kong, Urumqi"
    },
    {
        status: 1,
        title: "(GMT+08:00) Kuala Lumpur, Singapore",
        value: "8/Kuala Lumpur, Singapore"
    },
    {
        status: 1,
        title: "(GMT+08:00) Irkutsk, Ulaan Bataar",
        value: "8/Irkutsk, Ulaan Bataar"
    },
    {
        status: 1,
        title: "(GMT+08:00) Perth",
        value: "8/Perth"
    },
    {
        status: 1,
        title: "(GMT+08:00) Taipei",
        value: "8/Taipei"
    },
    {
        status: 1,
        title: "(GMT+09:00) Osaka, Sapporo, Tokyo",
        value: "9/Osaka, Sapporo, Tokyo"
    },
    {
        status: 1,
        title: "(GMT+09:00) Seoul",
        value: "9/Seoul"
    },
    {
        status: 1,
        title: "(GMT+09:00) Yakutsk",
        value: "9/Yakutsk"
    },
    {
        status: 1,
        title: "(GMT+09:30) Adelaide",
        value: "9.5/Adelaide"
    },
    {
        status: 1,
        title: "(GMT+09:30) Darwin",
        value: "9.5/Darwin"
    },
    {
        status: 1,
        title: "(GMT+10:00) Brisbane",
        value: "10/Brisbane"
    },
    {
        status: 1,
        title: "(GMT+10:00) Canberra, Melbourne, Sydney",
        value: "10/Canberra, Melbourne, Sydney"
    },
    {
        status: 1,
        title: "(GMT+10:00) Hobart",
        value: "10/Hobart"
    },
    {
        status: 1,
        title: "(GMT+10:00) Guam,Port Moresby",
        value: "10/Guam,Port Moresby"
    },
    {
        status: 1,
        title: "(GMT+10:00) Vladivostok",
        value: "10/Vladivostok"
    },
    {
        status: 1,
        title: "(GMT+11:00) Magadan, Solomon Is., New Caledonia",
        value: "11/Magadan, Solomon Is., New Caledonia"
    },
    {
        status: 1,
        title: "(GMT+12:00) Auckland, Wellington",
        value: "12/Auckland, Wellington"
    },
    {
        status: 1,
        title: "(GMT+12:00) Fiji, Kamchatka, Marshall Is.",
        value: "12/Fiji, Kamchatka, Marshall Is."
    },
    {
        status: 1,
        title: "(GMT+13:00) Nuku\'alofa",
        value: "13/Nuku\'alofa"
    }

];
