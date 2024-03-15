const data = {
    user: 'Eglon Metalia',
    overview: {
        EventDescription: 'This auction is about selling A4 Papers',
        Event: {
            "Event Name": 'Event Test 1001',
            "Event Type": 'Online Auction',
            "Default Currency": 'EUR',
            "Multi Currency Event": 'No',
            "Tied Bids": 'Equal worst position',
        },
        HostContactDetails: {
            "Name": 'G G',
            "Company": 'Eglon Metalia SHPK',
            "E-Mail": 'metalia.eglon@live.com',
            "Phone": '069',
        },
        AuctionRules: {
            "Auction Start Date": 'December 22, 2017 10:29 GMT',
            "Bid Direction": 'Forward',
            "Event Type": 'Ranked',
            "Minimum Duration": '10 minutes',
            "Dynamic Close Period": 'N/A',
            "Minimum Bid Change": '0.5%',
            "Maximum Bid Change": '10.0%',
        },
        Questionnaires: [
            {
                "Questionnaire Name": 'Test 1',
                "Question Quantity": 5,
                "Deadline": 'December 19, 2017 10:25 GMT',
            }, {
                "Questionnaire Name": 'Test 2',
                "Question Quantity": 10,
                "Deadline": 'December 19, 2017 10:25 GMT',
            }
        ]
    },
    questionnaires: {
        "Questionnaire 1": {
            "Deadline": "January 01, 2018 09:50 GMT",
            "questions": [
                {
                    "Question": "Do you have more then 10 employees?",
                    "QuestionType": "RadioButton",
                    "Answers":
                        {
                            "Yes": false,
                            "No": true
                        },

                }, {
                    "Question": "What type of Company are you?",
                    "QuestionType": "Select",
                    "Answers": {
                        "SHPK": false,
                        "SHA": false
                    },
                }, {
                    "Question": "What are your hobbies?",
                    "QuestionType": "CheckBox",
                    "Answers": {
                        "Tennis": false,
                        "Volley": false,
                        "Basket": false,
                        "Swim": false,
                    }
                }, {
                    "Question": "Do you want to upload extra documents?",
                    "QuestionType": "Upload",
                    "Answers": []
                }, {
                    "Question": "What is your opinion about this site?",
                    "QuestionType": "TextArea",
                    "Answer": "",
                }
            ]
        },
        "Questionnaire 2": {
            "Deadline": "January 02, 2018 09:50 GMT",
            "questions": [
                {
                    "Question": "Do you have more then 20 employees?",
                    "QuestionType": "RadioButton",
                    "Answers":
                        {
                            "Yes": false,
                            "No": true
                        },

                }, {
                    "Question": "What type of Company are you?",
                    "QuestionType": "Select",
                    "Answers": {
                        "Ltd": false,
                        "Plc": false
                    },
                }, {
                    "Question": "What are your hobbies?",
                    "QuestionType": "CheckBox",
                    "Answers": {
                        "Basket": false,
                        "Volley": true,
                        "Tennis": false,
                        "Swim": true,
                    }
                }, {
                    "Question": "Do you want to upload extra documents?",
                    "QuestionType": "Upload",
                    "Answers": []
                }, {
                    "Question": "What is your opinion about this site?",
                    "QuestionType": "TextArea",
                    "Answer": "alalalom",
                }
            ]
        },
        "Questionnaire 3": {
            "Deadline": "January 03, 2018 09:50 GMT",
            "questions": [
                {
                    "Question": "Do you have more then 30 employees?",
                    "QuestionType": "RadioButton",
                    "Answers":
                        {
                            "Yes": false,
                            "No": true
                        },

                }, {
                    "Question": "What type of Company are you?",
                    "QuestionType": "Select",
                    "Answers": {
                        "SHPK": false,
                        "SHA": false
                    },
                }, {
                    "Question": "What are your hobbies?",
                    "QuestionType": "CheckBox",
                    "Answers": {
                        "Swim": false,
                        "Tennis": false,
                        "Basket": false,
                        "Volley": false,
                    }
                }, {
                    "Question": "Do you want to upload extra documents?",
                    "QuestionType": "Upload",
                    "Answers": []
                }, {
                    "Question": "What is your opinion about this site?",
                    "QuestionType": "TextArea",
                    "Answer": "",
                }
            ]
        }
    },
    messages: [
        {
            key: 0,
            category: 'Outbox',
            from: 'Eglon Metalia',
            to: '4-AM Organizer',
            sendDate: '26 December 2017 13:49 GMT',
            content: 'Hello how are you, i have some questions related to the auction'
        }, {
            key: 1,
            category: 'Inbox',
            from: '4-AM Organizer',
            to: 'Eglon Metalia',
            sendDate: '26 December 2017 13:49 GMT',
            content: 'Hi Griseld, of course, what do you need?'
        }
    ]
};
export default data;
