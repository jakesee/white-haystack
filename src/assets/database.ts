import { IDatabase } from "@app/interfaces";

export const Database: IDatabase = {
    users: [
        {
            "id": 1,
            "username": "bill.gates@my-doc.com",
            "password": "mydoc",
            "firstName": "Bill",
            "lastName": "Gates",
            "gender": "Male",
            "birthdate": "10/28/1955",
            "episodes": []
        },
        {
            "id": 2,
            "username": "steve.jobs@my-doc.com",
            "password": "mydoc",
            "firstName": "Steve",
            "lastName": "Jobs",
            "gender": "Male",
            "birthdate": "02/24/1955",
            "episodes": []
        },
        {
            "id": 3,
            "username": "test",
            "password": "test",
            "firstName": "Jake",
            "lastName": "See",
            "gender": "Male",
            "birthdate": "01/22/1985",
            "episodes": [
                { "doctorName": "Dr Kim Lee Yong", "doctorImgUrl": "https://randomuser.me/api/portraits/men/75.jpg", "startAt": 1631893316000, "endAt": 1631893316000 },
                { "doctorName": "Dr Eileen Fox", "doctorImgUrl": "https://randomuser.me/api/portraits/women/65.jpg", "startAt": 1631893316000, "endAt": 1631893316000 },
                { "doctorName": "Dr Lucas Vamp", "doctorImgUrl": "https://randomuser.me/api/portraits/men/18.jpg", "startAt": 1631893316000, "endAt": 1631893316000 },
                { "doctorName": "Dr Angelina Jolie", "doctorImgUrl": "https://randomuser.me/api/portraits/women/35.jpg", "startAt": 1631893316000, "endAt": 1631893316000 },
                { "doctorName": "Dr Famous Amos", "doctorImgUrl": "https://randomuser.me/api/portraits/men/35.jpg", "startAt": 1631893316000, "endAt": 1631893316000 },
                { "doctorName": "Dr Minnie Feline", "doctorImgUrl": "https://randomuser.me/api/portraits/women/12.jpg", "startAt": 1631893316000, "endAt": 1631893316000 }
            ]
        }
    ],
    providers: [
        {
            "id": 0,
            "parentId": -1,
            "order": 0,
            "title": "MyDoc",
            "logoUrl": "logo-my-doc.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Clinic",
            "isMemberRequired": false,
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {}
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-my-doc.png",
                        "title": "MyDoc",
                        "blob": "Broccoli avocado basil pesto mediterranean vegetables crumbled lentils sriracha pecans seeds Thai butternut mix cool cucumbers fresh burritos samosa sparkling pomegranate punch habanero golden coriander."
                    }
                },
                {
                    "component": "SubProvidersSectionComponent",
                    "config": {}
                }
            ]
        },
        {
            "id": 1,
            "parentId": -1,
            "order": 0,
            "title": "Dai-ichi Life",
            "logoUrl": "logo-daiichi-life.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Insurer",
            "isMemberRequired": true,
            "sections": [
                {
                    "component": "ConsultNowComponent",
                    "config": {
                        "imgSource":"https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png",
                        "title": "Awesome Co. Virtual Teleheath",
                        "subText": "Operational Hours: 0800H - 2200H, including weekend and holidays",
                        "buttonText": "Talk to Doctor Now!",
                        "command": ["journey", "start"]
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-daiichi-life.png",
                        "title": "Dai-ichi Life",
                        "blob": "Broccoli avocado basil pesto mediterranean vegetables crumbled lentils sriracha pecans seeds Thai butternut mix cool cucumbers fresh burritos samosa sparkling pomegranate punch habanero golden coriander."
                    }
                },
                {
                    "component": "BannerSectionComponent",
                    "config": {}
                }
            ],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Talk to a doctor now!",
                    "cmdCancel": ["../.."],
                    "cmdSuccess": ["/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Validate Membership",
                            "component": "ProviderEligibilityFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Check Time",
                            "component": "NextAppointmentInfoFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 2,
            "parentId": -1,
            "order": 0,
            "title": "BaoViet Virtual Clinic",
            "logoUrl": "logo-baoviet.png",
            "description": "Morning smoothie bowl tofu soy milk lentils dessert raspberry fizz naga viper main course Thai basil curry blueberry chia seed jam leek bento box.",
            "category": "Insurer",
            "isMemberRequired": false,
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "https://scontent.fsin7-1.fna.fbcdn.net/v/t1.6435-9/s960x960/232491861_6805028339523453_4862348356804023918_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=e3f864&_nc_ohc=PxtG7PqIciYAX8Mnal7&_nc_ht=scontent.fsin7-1.fna&oh=d0bb9734911911fe017ef3300e7fdce5&oe=6168CDC9"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-baoviet.png",
                        "title": "BaoViet Life Insurance",
                        "blob": "Morning smoothie bowl tofu soy milk lentils dessert raspberry fizz naga viper main course Thai basil curry blueberry chia seed jam leek bento box."
                    }
                },
                {
                    "component": "OnetwothreeSectionComponent",
                    "config": {}
                },
                {
                    "component": "ConsultNowComponent",
                    "config": {
                        "imgSource": "https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png",
                        "title": "Awesome Co. Virtual Teleheath",
                        "subText": "Operational Hours: 0800H - 2200H, including weekend and holidays",
                        "buttonText": "Talk to Doctor Now!",
                        "command": ["journey", "start"]
                    }
                }
            ],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Book appointment with GP!",
                    "cmdCancel": ["../.."],
                    "cmdSuccess": ["/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 3,
            "parentId": 0,
            "order": 0,
            "title": "Aetna International",
            "description": "Sicilian pistachio pesto spiced pumpkin chili. Tabasco pepper apricot plums basil portobello mushrooms spring peanut butter peach strawberry mango sparkling.",
            "logoUrl": "logo-aetna.png",
            "category": "Insurer",
            "isMemberRequired": true,
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "https://scontent.fsin7-1.fna.fbcdn.net/v/t1.6435-9/s960x960/137550068_5172103752830461_72185124487826374_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=e3f864&_nc_ohc=DQ9Fbs6y304AX_KIeok&_nc_ht=scontent.fsin7-1.fna&oh=99e8f4340f624ac3f3d727d9b5c9325d&oe=61682178"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-aetna.png",
                        "title": "Aetna International",
                        "blob": "Bananas strawberry spinach salad cozy butternut leek edamame hummus garlic sriracha noodles green papaya salad tofu quinoa flatbread zesty tofu pad thai spicy smoked tofu burritos roasted brussel sprouts blood orange smash lime mango crisp Bolivian rainbow pepper. Crispy ghost pepper Chinese five-spice powder salty cherry bomb tahini drizzle miso turmeric glazed aubergine shiitake mushrooms dill red curry tofu noodles morning smoothie bowl. Thai dragon pepper red pepper cool cucumbers crumbled lentils bento box avocado basil pesto seitan lemon tahini dressing banana bread hemp seeds macadamia nut cookies red lentil curry sandwiches Thai curry sesame soba noodles lingonberry."
                    }
                },
                {
                    "component": "SymptomsSectionComponent",
                    "config": {}
                },
                {
                    "component": "OnetwothreeSectionComponent",
                    "config": {}
                },
                {
                    "component": "ConsultNowComponent",
                    "config": {
                        "imgSource": "https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png",
                        "title": "Awesome Co. Virtual Teleheath",
                        "subText": "Operational Hours: 0800H - 2200H, including weekend and holidays",
                        "buttonText": "Talk to Doctor Now!",
                        "command": [
                            "journey",
                            0
                        ]
                    }
                }
            ]
        },

        {
            "id": 4,
            "parentId": 0,
            "order": 0,
            "title": "Allianz Partners",
            "description": "Delightful blueberry scones quinoa flatbread couscous cozy butternut green pepper cool off garlic sriracha noodles grapefruit peanut butter crunch spicy miso dressing hearts of palm summer fruit salad.",
            "logoUrl": "logo-allianz.png",
            "isMemberRequired": true,
            "category": "Insurer"
        },
        {
            "id": 5,
            "parentId": 0,
            "order": 0,
            "title": "Prudential",
            "description": "Hazelnut shiitake mediterranean roasted brussel sprouts hummus falafel bowl bite sized heat couscous cherry bomb cherries Thai curry mangos basil hearts of palm cinnamon mediterranean vegetables shiitake mushrooms lychee.",
            "logoUrl": "logo-prudential.png",
            "isMemberRequired": true,
            "category": "Insurer"
        },
        {
            "id": 6,
            "parentId": 0,
            "order": 0,
            "title": "Nutriwell",
            "description": "Italian linguine puttanesca Thai super chili burritos summer fruit salad enchiladas farro platter winter quinoa flatbread basmati banana bread simmer peaches.",
            "logoUrl": "logo-nutriwell.png",
            "isMemberRequired": false,
            "category": "Clinic"
        },
        {
            "id": 7,
            "parentId": 0,
            "order": 0,
            "title": "Dr. Tan and Partners",
            "description": "Arugula salad red pepper coconut chili pepper cocoa lime ginger lemongrass agave green tea paprika elderberry vegan eating together tahini drizzle portobello mushrooms entree pesto figs double dark chocolate avocado blackberries with Mexican fiesta.",
            "logoUrl": "logo-dtap.png",
            "isMemberRequired": false,
            "category": "Clinic"
        },
        {
            "id": 8,
            "parentId": 0,
            "order": 0,
            "title": "Raffles Medical Group",
            "description": "Veggie burgers smoky maple tempeh glaze samosa Italian pepperoncini Caribbean red habanero plums tabasco pepper ginger carrot spiced juice cherry lingonberry appetizer sweet potato.",
            "logoUrl": "logo-raffles-medical-group.png",
            "isMemberRequired": true,
            "category": "Clinic"
        },
        {
            "id": 9,
            "parentId": 0,
            "order": 0,
            "title": "Mount Elizabeth",
            "description": "Balsamic vinaigrette green onions macadamia nut cookies cremini mushrooms cherry bomb pepper green papaya salad crunchy chai tea crispy iceberg lettuce.",
            "logoUrl": "logo-mount-elizabeth.png",
            "isMemberRequired": true,
            "category": "Specialist",
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {
                        "imgSrc": "assets/banner-mount-elizabeth.jpg"
                    }
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-mount-elizabeth.png",
                        "title": "Mount Elizabeth",
                        "blob": "Balsamic vinaigrette green onions macadamia nut cookies cremini mushrooms cherry bomb pepper green papaya salad crunchy chai tea crispy iceberg lettuce."
                    }
                },
                {
                    "component": "SubProvidersSectionComponent",
                    "config": {}
                }
            ]
        },
        {
            "id": 10,
            "parentId": 0,
            "order": 0,
            "title": "Guardian",
            "description": "Chinese five-spice powder red amazon pepper lemon maple orange tempeh dark and stormy cinnamon toast thyme grapefruit.",
            "logoUrl": "logo-guardian.png",
            "isMemberRequired": false,
            "category": "Pharmacy"
        },
        {
            "id": 11,
            "parentId": 0,
            "order": 0,
            "title": "Watsons",
            "description": "Almond milk avocado dressing drizzle black beans banana lavender lemonade oranges tasty crispy seitan cool cucumbers.",
            "logoUrl": "logo-watsons.png",
            "isMemberRequired": false,
            "category": "Pharmacy"
        },
        {
            "id": 12,
            "parentId": 9,
            "order": 0,
            "title": "Mental Health",
            "description": "Kung pao pepper green pepper springtime strawberry hemp seeds bruschetta tahini drizzle red amazon pepper potato fig arugula cashew salad artichoke hearts cool cucumbers blackberries raspberry fizz dragon fruit portobello mushrooms.",
            "logoUrl": "logo-mental-health.png",
            "isMemberRequired": true,
            "category": "Specialist",
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Find a Counsellor",
                    "cmdCancel": ["../.."],
                    "cmdSuccess": ["/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Validate Membership",
                            "component": "ProviderEligibilityFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Check Time",
                            "component": "NextAppointmentInfoFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 13,
            "parentId": 9,
            "order": 0,
            "title": "Women's Clinic",
            "description": "Peanut butter cozy cinnamon oatmeal lemon lime minty winter Bulgarian carrot sweet potato black bean burrito lemon red lentil soup red curry tofu noodles crispy spicy.",
            "logoUrl": "logo-womens-health.png",
            "isMemberRequired": true,
            "category": "Specialist",
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Wellness starts here.",
                    "cmdCancel": ["../.."],
                    "cmdSuccess": ["/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Validate Membership",
                            "component": "ProviderEligibilityFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Check Time",
                            "component": "NextAppointmentInfoFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 14,
            "parentId": 0,
            "order": 0,
            "title": "MyDoc",
            "logoUrl": "logo-my-doc.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Clinic",
            "isMemberRequired": false,
            "sections": [
                {
                    "component": "BannerSectionComponent",
                    "config": {}
                },
                {
                    "component": "TitleBarSectionComponent",
                    "config": {
                        "logoImgSrc": "assets/logo-my-doc.png",
                        "title": "MyDoc",
                        "blob": "Broccoli avocado basil pesto mediterranean vegetables crumbled lentils sriracha pecans seeds Thai butternut mix cool cucumbers fresh burritos samosa sparkling pomegranate punch habanero golden coriander."
                    }
                },
                {
                    "component": "SubProvidersSectionComponent",
                    "config": {}
                }
            ]
        },
        {
            "id": 15,
            "parentId": 14,
            "order": 0,
            "title": "MyDoc GP Clinic",
            "logoUrl": "logo-my-doc.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Clinic",
            "isMemberRequired": false,
            "sections": [],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Talk to a doctor now!",
                    "cmdCancel": ["../.."],
                    "cmdSuccess": ["/waiting-room"],
                    "sequence": [
                        {
                            "stepName": "Emergency Notice",
                            "component": "EmergencyFormComponent",
                            "config": {}
                        },
                        {
                            "stepName": "Triage",
                            "component": "TriageFormComponent",
                            "config": {
                                "questionText": "What complaints do you have today?"
                            }
                        },
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Medical Profile",
                            "component": "MedicalProfileFormComponent",
                            "config": {
                                "title": "Please confirm your medical profile"
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        },
        {
            "id": 16,
            "parentId": 14,
            "order": 0,
            "title": "MyDoc Health Screening",
            "logoUrl": "logo-my-doc.png",
            "description": "Hemp seeds Thai soba noodles candy cane winter crunchy seaweed blueberry pops Southern Italian sweet potato black bean burrito green tea lime apricot instant pot dark chocolate green pepper",
            "category": "Clinic",
            "isMemberRequired": false,
            "sections": [],
            "journey": {
                "start": {
                    "auth": true,
                    "label": "Book Health Screening Appointment",
                    "cmdCancel": [
                        "../.."
                    ],
                    "cmdSuccess": [
                        "/waiting-room"
                    ],
                    "sequence": [
                        {
                            "stepName": "Confirm Personal Info",
                            "component": "CollectPersonalInfoFormComponent",
                            "config": {
                                "title": "Please provide your personal info."
                            }
                        },
                        {
                            "stepName": "Request Appointment",
                            "component": "RequestAppointmentFormComponent",
                            "config": {}
                        }
                    ]
                }
            }
        }
    ]
}
