# Predicate Injection

**Predicate Injection** - Predicate injection allows you to pass a JavaScript function to decide whether the stub should match or not. Unlike other predicates, predicate injections bind to the entire request object, which allows you to base the result on multiple fields.

#### Instructions:

##### Note: We will build on the example from the [modularized setup module](/ModularizedSetup/src).

- **Directory Setup**: We are going to make few changes for the directory Setup
```
.
├── exampleAPI
│   ├── predicates  ->  this folder will hold the predicates we will inject into our stubs.
│   │   └── predicate.js
│   ├── responses
│   │   ├── char5.json
│   │   ├── char6.json
│   │   └── char7.json
│   ├── stubs
│   │   ├── character.ejs
│   │   └── default.ejs
│   └── stubs.ejs
└── imposters.ejs
```

- **Stubs Cleanup**
  - Before we can start with the predicate, we need to cleanup few things. Let's start with updating `character.ejs`
  - You can combine matching predicates under the same condition for readability and maintenance purposes.
  - Let's start with the predicate for `character/5`
    - Change the matching condition from `deepEquals` to `equals`
    - Combine `path and method` in the same matching condition.
    - So, your code should look something like below:
      ```json
      "equals": {
        "method": "GET",
        "path": "/api/character/5"
      }
      ```
    - Based on your conditions you can use matching conditions from [Predicate Matching Module](/PredicateMatching/) to combine the request contents
    - You can see additional cleanup in the attached examples
  - Let clean few things around response for `character/5`
    - We can remove majority of things from the response for readability.
    - Remove `_mode` and cleanup header to match `"Content-Type": "application/json"`
    - Just keep required content you want in your response.
    - You can see additional cleanup in the attached examples
  - Let's make one final change to the `stubs/default.ejs`
    - Update the response to following:
      ```json
      {
        "responses": [{ "is": { "statusCode": 400 } }]
      }
      ```

- **New Stub Creation**
  - We are going to create a new stub to test out predicate injection
  - Create a new stub in the `stubs/character.ejs` file
  - Add the following code after the `character/7` stub
    ```json
    {
      "predicates": [{"inject": "<%- stringify(filename, './exampleAPI/predicates/predicate.js') %>"}],
      "responses": [{ "is": { "statusCode": 200 } }]
    },
    ```
    - We are asking mountebank to inject the JavaScript function in the predicate
    - Response is configured to send back a 200 response if the predicate matches.

- **Predicate Injection File**
  - Create a new file `predicates/predicate.js`
  - Add the following code to it
    ```js
    (config) => {
      function IsJsonString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }

      if (config.request.method === 'POST') {
        if (config.request.headers['Content-Type'] === 'application/json') {
          return IsJsonString(config.request.body);
        }
      } else {
        return {
          statusCode: 400,
          headers: {
            "content-type": "application/json",
          },
          body: {
            "error": "Unsupported request"
          }
        };
      }
    }
    ```
  - Let's break down the above snippet
    - We are creating an anonymous function passing in the `config` parameter provided by mountebank with every request and response. `(config) => `
    - We have another function that does simple check whether the post body is a json string.
      ```js
      function IsJsonString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      }
      ```
    - Finally, we have a condition to check if it is a POST request with `application/json` header

- **Test the Setup**
  - open terminal and enter the following command to start mountebank `mb --configfile imposters.ejs`
  - Make a Post request to `https://localhost:6568/api/character/`
  - Add a simple post body to the request
  ```JSON
  {
    "test": "Hello World"
  }
  ```
  - Add the header `Content-Type` with value of `application/json`
  - When you send the request, you should see a status 200 returned
  - When you disable the header and send the request you should see a status 400 returned


- **Summary**
  - Predicate injection allows you match multiple request criteria before getting a response back
