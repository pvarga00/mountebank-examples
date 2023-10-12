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
