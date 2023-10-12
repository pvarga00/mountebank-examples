# Modularized Setup

#### Background:
So far so good, but it is time to break down the big file to more maintainable and easier to understand setup.

So, let’s get started

#### Instructions:

##### Note: We will build on the example recording from the [predicate matching module](/PredicateMatching/src).

- **Directory Setup**
```
src
├── exampleAPI              -> this folder will hold information about the routes for the API
│   ├── responses           -> this folder will hold information about the responses for the requests
│   │   ├── char5.json
│   │   ├── char6.json
│   │   └── char7.json
│   ├── stubs               -> this folder will hold information about the stubs for the API
│   │   ├── character.ejs
│   │   └── default.ejs
│   └── stubs.ejs           -> this file will hold information about the stubs for the API
└── imposters.ejs           -> this file will hold information about our imposters
```

- **Imposters.ejs**
  - Let’s start by making a copy of `recording.json` over to the `src` folder.
  - Copy the file and paste in the `imposter.ejs`
  - Clear all the contents for the `stubs` key in the json
  - It should look something like `stubs: []`
  - Add the following code to the `stubs` `<% include exampleAPI/stubs.ejs %>`
  - The stubs should look something like this now
  ```ejs
  "stubs": [
      <% include exampleAPI/stubs.ejs %>
  ]
  ```
  - We have programmed mb to include stubs from the `exampleAPI` folder during load time
  - Save the file

- **Stubs**
  - We will start with creating few stubs for our imposter
  - For our recording we hit 2 routes `/api/character/` and `the proxy to service`
  - Let’s create 2 stubs for each of the routes
  - Let’s call the first file `character.ejs` and save it in the `exampleAPI/stubs` folder
  - Let’s call the second file `default.ejs` and save it in the `exampleAPI/stubs`folder
  - Open the `character.ejs` and let’s copy some data over from the recording.json
  - If using the same recording.json file lets copy all the stubs for `api/character` - line 12 - 125
  - Let’s clean up few things on the stubs:
    - Clear out the response body so it looks something like `"body": " "`
    - As the header don’t impact cause any impact on the response, you can delete most of the headers except `content-type`
    - You can delete the `deepEquals` query code block since we don’t use for the stubs
  - Once everything is cleaned up you should just have empty stub something similar to
  ```json
  {
    "predicates": [
      {
        "deepEquals": {
          "method": "GET"
        }
      },
      {
        "contains": {
          "path": "/api/character/5"
        }
      }
    ],
    "responses": [
      {
        "is": {
          "statusCode": 200,
          "headers": {
            "Content-Type": "application/json; charset=utf-8"
          },
          "body": " ",
          "_mode": "text"
        }
      }
    ]
  },
  ```
  - Cleanup all the predicates in the stubs and save the file.
  - Copy over the stub for proxy to the `default.ejs` file and save it

- **Responses**
  - Now that we have the stubs ready let’s move to the responses setup
  - If using the same recording.json file lets copy the body of the response and save it to `responses/char5.json`
  - **Note** - You can copy the response directly from the postman into the `responses/char5.json`
  - Let’s go back to Stubs and finish up the rest of setup.

- **Stubs Part 2**
  - We have one quick update to make here. We just need to update the empty body tag.
  - Add the following code to map the response to the stubs file. `<%- stringify(filename, './exampleAPI/responses/char5.json') %>`
  - Your code should look something like this
  ```json
    "body": "<%- stringify(filename, './exampleAPI/responses/char5.json') %>",
  ```

- **Stubs.ejs**
  - Now that we have configured `imposters.ejs` and the stubs, lets edit the `stubs.ejs` file inside the exampleAPI folder to map everything together
  - If you followed the instructions above and if you have 2 stubs, you need to map those out in the `stubs.ejs` file
  - Your code should look something like
  ```ejs
  <% include stubs/character.ejs%>
  <% include stubs/default.ejs%>
  ```
  - **Note**: the order of the stubs matter. If in the above example if you place the default stub above the character stub. The default will reach out the real service and you will never hit the mocks. So be sure of your ordering.

- **Running MB**
  - open terminal and enter the following command to start mountebank `mb --configfile imposters.ejs`
  - open postman and make a `GET` request at `https://localhost:6568/api/character/5`
  - You should hte mock response back from mountebank

#### Summary:
We broke down the big files into multiple chunks for easy maintenance. Here is a quick summary of data flow:
```
 responses --(send to)--> stubs --(send to)--> imposters
```
