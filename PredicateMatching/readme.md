# Predicate Matching
#### Background:

Predicate matching allows you to get a desired response even when you pass random data. Mountebank will read the data in your predicate and reply using an appropriate response.

##### Predicate Matching Types: [More Info](http://www.mbtest.org/docs/api/predicates#predicates-equals)
| Matching Type | Description |
| ---- | ---- |
| equals | requires the request field to equal predicate value |
| deepEquals | requires all the request fields to equal predicate value |
| contains | requires the request field to contain predicate value |
| startsWith | requires the request field to start with predicate value |
| endsWith | requires the request field to end with predicate value |
| Matches | requires the request field to match the regular expression provided as the predicate value |
| exists | requires the request field to exists as a nonempty value or not |
| not | inverts the subpredicate |
| or | requires any of predicate value to be matched |
| and | requires all of predicate value to be matched |

##### Predicate Matching Fields:
You can match against any of your request field. For example, you can use the above matching types against headers, body, query string parameters or path.

##### Note: We will build on the example recording from the [record/replay behavior](/RecordReplay/src).

- *Understanding the recording*

  ![Layout](https://git.rockfin.com/QAPOW/mountebank-examples/blob/master/PredicateMatching/images/imposter_layout.jpg)
  - The recording can be split in 2 major sections:
   - information about the api
   - information about routes with responses for the api.

#### Instructions:
- Open the recording.json file from the record/replay tutorial.
- Let’s go through the recording.
  - You have the basic information about the api here.
    - Protocol: Mountebank supports multiple types of protocols -> https, http, tcp and smtp. Mountebank also allows you to create a custom protocol if you need one. [Custom Protocol Docs](http://www.mbtest.org/docs/protocols/custom)
    - Port: the port at which you can access the mocks
    - Name: Name for your mocks
    - key/cert: Mountebank provides a set of Key and Certificate for https protocols. As soon as you start recording mountebank will add its version of keys and certs.
  - Stubs - you will have the information regarding your paths here.
- We will cover **contains**, and **matches** in this tutorial. You can try out the rest by following the official documentation. [More Info](http://www.mbtest.org/docs/api/predicates#predicates-equals)
  -  **Contains**
      - Let’s start with the first stub. It makes a call to get information about character 5.  (Line 21)
      - Let’s change the **deepEquals** at line 20 and change it to **contains**.
      - Save the file
      - Start mountebank with the recording. `mb --configfile recording.json` **(Local Setup)**
      - Start postman and make a get request to this route `/api/character/5`. `https://localhost:6568/api/character/5`.
      - You should see the name in the response is **mocked name.**
      - If you modify the route to `/api/character/5/test/contains`
      - You should still get the same response back.
  - **Matches**
      - Shutdown mb by pressing `ctrl + c`
      - Go back to the recording.json and update line 58 to **matches**
      - Update line 59 `character/6` to `character/[a-z]`
      - Save it and restart mb again.
      - If you make a request to `character/6` you should get the response back from actual service.
      - Update the request to `character/a` you should get the response back with name `Mock Cluster Princess`

##### Summary:
As you can see the predicate matching can be a powerful setup. If you were testing your API and you did not care what was passed in but wanted to get the same desired response back, you can use different types of predicate matching.
