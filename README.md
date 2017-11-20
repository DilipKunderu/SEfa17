[![Build Status](https://img.shields.io/travis/DilipKunderu/SEfa17.svg?style=flat-square)](https://travis-ci.org/DilipKunderu/SEfa17)

# GatorHousing - Apartment / sublease finder Website

	Online marketplace enabling people to lease or rent apartments

## Getting Started

    The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

 `` 1) 'Angular 4'
    2)  Node.JS
    3)  Elasticsearch``

### Installing

    A step by step series that tells you how to get a development env running

```
    1) Clone the repository and go to the /backend folder
    2) Run npm install -> This will download all the dependencies
    3) Run npm start to start the server.
    4) Open localhsot:3000 and it should print a welcome message 
```


## Running the tests

    To run the automated test cases for this system

```
    Go to the /backend folder and run npm test command. This should start the automated test cases. 
```



## Backend API Description

**1) Apartment/House sublease ADD API**
----
  This API is used to add or post new sublease apartments.

* **URL**

  `http:// IP Address:3000/add`

* **Method:**
  
     `POST`
  
*  **URL Params**

   `None`

* **Data Params**

    `{
	"title": "some title",
	"owner": "saptarshi",
	"location": "gainesville, Florida, USA",
	"zipcode": 32608,
	"description": "brief description about the apartment",
	"geolocation" : {
            "lat" : 40.12,
            "lon" : -71.34
    },
	"details": {
		"accomodates": 1,
		"bathrooms": 1,
		"bathroomtype": "private",
		"bedrooms": 2,
		"studio": false,
		"beds": 2,
		"petfriendly": true,
		"propertytype": "private",
		"roomtype": "private room"
	},
	"amenities": {
		"kitchen": true,
		"internet": false,
		"tv": true,
		"essentials": false,
		"shampoo": true,
		"heating": false,
		"airconditioning": true,
		"washer": true,
		"dryer": true,
		"free_parking_on_premises": true,
		"free_parking_on_street": false,
		"paid_parking_off_premises": false,
		"wireless_internet": true,
		"cable_tv": true,
		"family_or_kid_friendly": true,
		"suitable_for_events": false,
		"smoking_allowed": false,
		"wheelchair_accessible": true,
		"elevator": true,
		"indoor_fireplace": false,
		"buzzer_or_wireless_intercom": false,
		"doorman": false,
		"pool": true,
		"hottub": true,
		"gym": true,
		"hangers": true,
		"laptop_friendly_workspace": true,
		"private_entrance": false,
		"window_guards": false,
		"bathtub": true
	},
	"house_roles": ["No smoking",
		"No parties or events",
		"Check in time is 12PM (noon) - 5PM"
	]
}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : the identifier of the newly listed apartment }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "JSON Invalid" }`

* **Sample Call:**

    `curl -H "Content-Type: application/json" -X POST -d '<your json data>' http://127.0.0.1:3000/add`


**2) Apartment/House sublease GET ALL API**
----
  This API is used to get all the apartments present in the DB.

* **URL**

  `http:// IP Address:3000/get`

* **Method:**
  
     `GET`
  
*  **URL Params**

   `None`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : the identifier of the newly listed apartment }] -> [id1, id2, id3]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Request" }`


  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No entry found in DB" }`

* **Sample Call:**

    `curl http://127.0.0.1:3000/get`



**3) Apartment/House sublease DELETE ALL API**
----
  This API is used to delete all the apartments present in the DB.

* **URL**

  `http:// IP Address:3000/get`

* **Method:**
  
     `DELETE`
  
*  **URL Params**

   `None`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ true }]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Request" }`


  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No entry found in DB" }`

* **Sample Call:**

    `curl -X "DELETE" http://127.0.0.1:3000/delete`


**4) Apartment/House sublease GET ALL API with id**
----
  This API is used to get a specific apartment, if it is present in the DB.

* **URL**

  `http:// IP Address:3000/get_id?id=some id`

* **Method:**
  
     `GET`
  
*  **URL Params**

   `id`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ information about the element with specific id }] `
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Request with non-existing id" }`


  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No entry found in DB" }`

* **Sample Call:**

    `curl http://127.0.0.1:3000/get_id?id=12345cf234`


**5) Apartment/House sublease DELETE ALL API**
----
  This API is used to delete all the apartments present in the DB.

* **URL**

  `http:// IP Address:3000/delete_id?id=someid"`

* **Method:**
  
     `DELETE`
  
*  **URL Params**

   `id`

* **Data Params**

    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{ id : the identifier of the newly listed apartment }] -> [id1, id2, id3]`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : "Invalid Request" }`


  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No entry found in DB" }`

* **Sample Call:**

    `curl -X "DELETE" http://127.0.0.1:3000/delete_id?id=12334cf2`
