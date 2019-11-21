# hacktivoverflow

**Base URL: `http://.sufrendo.com`**

**List of Routes User:**

| **Route**         | **HTTP** | **Description**                                      |
| ----------------- | -------- | ---------------------------------------------------- |
| /register   | POST     | Sign up with new user info                           |
| /login      | POST     | Sign in and get an access token based on credentials |

**List of Routes Question:**

| **Route**    | **HTTP** | **Description**                       |
| ------------ | -------- | ------------------------------------- |
| /questions | POST      | Create new question (login required)           |
| /questions  | GET      | Get all questions           |
| /questions/:id/upvote  | PATCH      |  Upvote one question (login required)|
| /questions/:id/downvote  | PATCH      | Downvote one question (login required)|
| /questions/:id | PATCH      | Update one question (login required)|
| /questions/:id  | DELETE      | Delete one question (login required)|

**List of Routes Answer:**

| **Route**    | **HTTP** | **Description**                       |
| ------------ | -------- | ------------------------------------- |
| /answers/:id/upvote  | PATCH      |  Upvote one answer (login required)|
| /answers/:id/downvote  | PATCH      | Downvote one answer (login required)|
| /answers/:id | PATCH      | Update one answer (login required)|
| /answers/:id  | DELETE      | Delete one answer (login required)|
| /answers/:id  | CREATE      | Create new answer (login required)|

**Errors:**

| Code | Name                  | Description                               |
| ---- | --------------------- | ----------------------------------------- |
| 400  | Authentication Failed | Email or Password is incorrect or user need to log in first            |
| 401  | Unauthorized Access   | User is not authorized to do that action        |
| 404  | Not Found             | The requested resource could not be found |
| 500  | Internal Server Error | We had a problem with our server          |

**Sign Up**
----
* **URL:** `/register`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
    ```
    {
    "email":"satu@mail.com", <string, valid email>
    "password":"12345" <string, 4 characters min>
    }
    ```

* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c",
        "user": "satu@mail.com"
    }
    ```


**Login**
----
* **URL:** `/login`
* **Method:** `POST`
* **URL Params:** `None`
* **Data Params:**
	```
    {
    "email":"satu@mail.com", <string, valid email>
    "password":"12345" <string, 4 characters min>
    }
	```
* **Success Response:**
  * **Status:** `200`
    **Content:** 
    
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c",
        "user": "satu@mail.com"
    }
    ```
**Create Question**
----
* **URL:** `/questions`
* **Method:** `POST`
* **URL Params:** `None`
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:**
	```
    {
        "title":"=====================>",
        "desc":"untuk pertanyaan"
    }
	```
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [],
        "downvotes": [],
        "answers": [],
        "_id": "5dd657961550b5407b11f9b9",
        "title": "=====================>",
        "desc": "untuk pertanyaan",
        "UserId": "5dd4ab6bc019ce1f474a39bd",
        "createdAt": "2019-11-21T09:23:34.919Z",
        "updatedAt": "2019-11-21T09:23:34.919Z"
    }
    ```
**Get All Question**
----
* **URL:** `/questions`
* **Method:** `GET`
* **URL Params:** `None`
* **Header Params:** `None`
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `200`
    **Content:** 
    
    ```
    [
     {
        "upvotes": [],
        "downvotes": [],
        "answers": [],
        "_id": "5dd4ba2c90c52928f379797b",
        "title": "ini judul",
        "desc": "hahahaha",
        "UserId": {
            "_id": "5dd4ab6bc019ce1f474a39bd",
            "email": "sachi@mail.com"
        },
        "createdAt": "2019-11-20T03:59:40.701Z",
        "updatedAt": "2019-11-20T03:59:40.701Z"
     },...
    ]
    ```

**Delete Question**
----
* **URL:** `/questions/:id`
* **Method:** `DELETE`
* **URL Params:** 
    ```
    5dd657961550b5407b11f9b9
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `204`
    **Content:** 
    
    ```
    None
    ```
**Update Question**
----
* **URL:** `/questions/:id`
* **Method:** `PATCH`
* **URL Params:**
    ```
    5dd657961550b5407b11f9b9
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:**
	```
    {
        "title":"=====================> di update",
        "desc":"untuk pertanyaan"
    }
	```
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [],
        "downvotes": [],
        "answers": [],
        "_id": "5dd657961550b5407b11f9b9",
        "title": "=====================> di update",
        "desc": "untuk pertanyaan",
        "UserId": "5dd4ab6bc019ce1f474a39bd",
        "createdAt": "2019-11-21T09:23:34.919Z",
        "updatedAt": "2019-11-21T09:23:34.919Z"
    }
    ```
**Upvote Question**
----
* **URL:** `/questions/:id/upvote`
* **Method:** `PATCH`
* **URL Params:**
    ```
    5dd657961550b5407b11f9b9
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [
            "5dd4ab6bc019ce1f474a39bd"
        ],
        "downvotes": [],
        "answers": [],
        "_id": "5dd51b73c55bc15117c00e9f",
        "title": "coba buat",
        "desc": "Ini pertanyaan baru",
        "UserId": {
            "_id": "5dd4ab6bc019ce1f474a39bd",
            "email": "sachi@mail.com",
            "password": "$2b$10$VXFfknxga76Z99pbkWnCxOMbQ54xqz6FkT3ZnKxuwptGuaVBTPC46",
            "createdAt": "2019-11-20T02:56:43.132Z",
            "updatedAt": "2019-11-20T02:56:43.132Z"
        },
        "createdAt": "2019-11-20T10:54:43.782Z",
        "updatedAt": "2019-11-21T09:40:37.760Z"
    }
    ```
**Downvote Question**
----
* **URL:** `/questions/:id/downvote`
* **Method:** `PATCH`
* **URL Params:**
    ```
    5dd657961550b5407b11f9b9
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [],
        "downvotes": [
            "5dd4ab6bc019ce1f474a39bd"
        ],
        "answers": [],
        "_id": "5dd51b73c55bc15117c00e9f",
        "title": "coba buat",
        "desc": "Ini pertanyaan baru",
        "UserId": {
            "_id": "5dd4ab6bc019ce1f474a39bd",
            "email": "sachi@mail.com",
            "password": "$2b$10$VXFfknxga76Z99pbkWnCxOMbQ54xqz6FkT3ZnKxuwptGuaVBTPC46",
            "createdAt": "2019-11-20T02:56:43.132Z",
            "updatedAt": "2019-11-20T02:56:43.132Z"
        },
        "createdAt": "2019-11-20T10:54:43.782Z",
        "updatedAt": "2019-11-21T09:40:37.760Z"
    }
    ```
**Create Answer**
----
* **URL:** `/answers/:id`
* **Method:** `POST`
* **URL Params:** 
    ```
    5dd51b73c55bc15117c00e9f <id question yang mau dijawab>
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:**
	```
    {
        "desc":"untuk jawaban"
    }
	```
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [],
        "downvotes": [
            "5dd4ab6bc019ce1f474a39bd"
        ],
        "answers": [
            {
                "upvotes": [],
                "downvotes": [],
                "_id": "5dd65d051550b5407b11f9ba",
                "desc": "untuk jawaban",
                "UserId": {
                    "_id": "5dd4ab6bc019ce1f474a39bd",
                    "email": "sachi@mail.com",
                    "password": "$2b$10$VXFfknxga76Z99pbkWnCxOMbQ54xqz6FkT3ZnKxuwptGuaVBTPC46",
                    "createdAt": "2019-11-20T02:56:43.132Z",
                    "updatedAt": "2019-11-20T02:56:43.132Z"
                },
                "QuestionId": "5dd51b73c55bc15117c00e9f",
                "createdAt": "2019-11-21T09:46:45.759Z",
                "updatedAt": "2019-11-21T09:46:45.759Z"
            }
        ],
        "_id": "5dd51b73c55bc15117c00e9f",
        "title": "coba buat",
        "desc": "Ini pertanyaan baru",
        "UserId": {
            "_id": "5dd4ab6bc019ce1f474a39bd",
            "email": "sachi@mail.com"
        },
        "createdAt": "2019-11-20T10:54:43.782Z",
        "updatedAt": "2019-11-21T09:46:45.763Z"
    }
    ```
**Update Answer**
----
* **URL:** `/answers/:id`
* **Method:** `PATCH`
* **URL Params:** 
    ```
    5dd51b73c55bc15117c00e9f <id answer yang mau diupdate>
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:**
	```
    {
        "desc":"untuk jawaban SEKARANG DIUPDATE"
    }
	```
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5dd65d051550b5407b11f9ba",
        "desc": "untuk jawaban SEKARANG DIUPDATE",
        "UserId": "5dd4ab6bc019ce1f474a39bd",
        "QuestionId": "5dd51b73c55bc15117c00e9f",
        "createdAt": "2019-11-21T09:46:45.759Z",
        "updatedAt": "2019-11-21T09:49:02.825Z"
    }
    ```
**Delete Answer**
----
* **URL:** `/answers/:id`
* **Method:** `DELETE`
* **URL Params:** 
    ```
    5dd51b73c55bc15117c00e9f <id answer yang mau didelete>
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5dd65d051550b5407b11f9ba",
        "desc": "untuk jawaban SEKARANG DIUPDATE",
        "UserId": "5dd4ab6bc019ce1f474a39bd",
        "QuestionId": "5dd51b73c55bc15117c00e9f",
        "createdAt": "2019-11-21T09:46:45.759Z",
        "updatedAt": "2019-11-21T09:49:02.825Z"
    }
    ```
**Delete Answer**
----
* **URL:** `/answers/:id`
* **Method:** `DELETE`
* **URL Params:** 
    ```
    5dd51b73c55bc15117c00e9f <id answer yang mau didelete>
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [],
        "downvotes": [],
        "_id": "5dd65d051550b5407b11f9ba",
        "desc": "untuk jawaban SEKARANG DIUPDATE",
        "UserId": "5dd4ab6bc019ce1f474a39bd",
        "QuestionId": "5dd51b73c55bc15117c00e9f",
        "createdAt": "2019-11-21T09:46:45.759Z",
        "updatedAt": "2019-11-21T09:49:02.825Z"
    }
    ```
**Upvote Answer**
----
* **URL:** `/answers/:id/upvote`
* **Method:** `PATCH`
* **URL Params:** 
    ```
    5dd4ab6bc019ce1f474a39bd <id answer yang mau diupvote>
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [
            "5dd4ab6bc019ce1f474a39bd"
        ],
        "downvotes": [],
        "_id": "5dd5fa191f27f81092615292",
        "desc": "coba jawab gan",
        "UserId": "5dd4ab6bc019ce1f474a39bd",
        "QuestionId": "5dd4bcff0392442bb6002ec6",
        "createdAt": "2019-11-21T02:44:41.409Z",
        "updatedAt": "2019-11-21T09:57:57.242Z"
    }
    ```
**Downvote Answer**
----
* **URL:** `/answers/:id/downvote`
* **Method:** `PATCH`
* **URL Params:** 
    ```
    5dd4ab6bc019ce1f474a39bd <id answer yang mau diupvote>
    ```
* **Header Params:**
    ```
    {
        "token": "eyJhbGciOiJIUzI1NiJ9.NWRkNjU2MTExNTUwYjU0MDdiMTFmOWI4.qbdRWD5knmy-xdBFuUyexPDF_IEDfVzoCu71_W3KX-c"
    }
    ```
* **Data Params:** `None`
* **Success Response:**
  * **Status:** `201`
    **Content:** 
    
    ```
    {
        "upvotes": [],
        "downvotes": [
            "5dd4ab6bc019ce1f474a39bd"
        ],
        "_id": "5dd5fa191f27f81092615292",
        "desc": "coba jawab gan",
        "UserId": "5dd4ab6bc019ce1f474a39bd",
        "QuestionId": "5dd4bcff0392442bb6002ec6",
        "createdAt": "2019-11-21T02:44:41.409Z",
        "updatedAt": "2019-11-21T09:58:54.145Z"
    }
    ```