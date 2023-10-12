# Response Injection

#### Instructions:

**Response Injection** - Response injection allows you to dynamically construct the response based on the request and previous requests. mountebank will use the default value documented on the [protocol page](http://www.mbtest.org/docs/protocols/http) for any response fields you leave empty.

##### Note: We will build on the example from the [modularized setup module](/ModularizedSetup/src).

- **Directory Setup**:
```
.
├── exampleAPI
│   ├── responses
│   │   ├── char5.json
│   │   ├── char6.json
│   │   ├── char7.json
│   │   └── response.js
│   ├── stubs
│   │   ├── character.ejs
│   │   └── default.ejs
│   └── stubs.ejs
└── imposters.ejs
```

- **Stubs Cleanup**
  - Before we can start, we need to cleanup few things. Let's start with updating `character.ejs`
  - You can combine matching predicates under the same condition for readability and maintenance purposes.
  - Let's start with the predicate for `character/5`
    - Change the matching condition from `deepEquals` to `equals`
    - Remove the path match condition from the predicate
    - So, your predicate should look something like below:
      ```json
      "predicates": [
        {
          "equals": {
            "method": "GET"
          }
        }
      ],
      ```
    - You can see additional cleanup in the attached examples
  - Let's clean few things around response for `character/5`
    - We can completely clear out the response and replace it with the response file we are going to inject.
    - The response should look something like below with injection:
    ```json
      "responses": [{"inject": "<%- stringify(filename, './exampleAPI/responses/response.js') %>"}]
    ```
    - You can see additional cleanup in the attached examples

- **Response Injection File**
  - Create a new file `responses/response.js`
  - Add the following code to it
    ```js
    (config) => {
      if (config.request.method === 'GET') {
        if (config.request.path.includes('/api/character/5')) {
          let response = JSON.parse("<%- stringify(filename, '/exampleAPI/responses/char5.json') %>");
          response.fetchDate = new Date();
          return {
            headers: {
              "content-type": "application/json",
            },
            body: response
          }
        }
        if (config.request.path.includes('/api/character/7')) {
          let response = JSON.parse("<%- stringify(filename, '/exampleAPI/responses/char7.json') %>");
          response.status = 'Mountebank Injection'
          return {
            headers: {
              "content-type": "application/json",
            },
            body: response
          }
        }
      } else {
        return {
          statusCode: 400,
          headers: {
            "content-type": "application/json",
          },
          body: {
            "error": "Unsupported Request"
          }
        };
      }
    }
    ```
  - Let's break down the above snippet
    - We are creating an anonymous function passing in the `config` parameter provided by mountebank with every request and response. `(config) => `
    - We have an if condition to check for a GET request and the path on the request
    - Next we parse in the default response and add additional dynamic content to that response. In the case of `character/5` we are adding current date time on every request.

- **Test the Setup**
  - open terminal and enter the following command to start mountebank `mb --configfile imposters.ejs`
  - Make a GET request to `https://localhost:6568/api/character/5`
  - Add the header `Content-Type` with value of `application/json`
  - When you send the request, you should see a status 200 returned with a response containing the date field we added to the response

- **Summary**
  - Response injection allows you to configure your responses to your liking.
