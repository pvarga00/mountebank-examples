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