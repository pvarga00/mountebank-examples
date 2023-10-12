# Record & Replay
#### Background:

Record and Replay is the most simplest setup for mountebank. You can record the network calls to your api and save the recording. You can put the recording on replay mode and test your calls against the recording now. Recording leverages the proxy feature of mountebank to record the calls.

#### Example
Here is a sample flow (derived from mountebank documentation) demonstrating how data flows from during the recording feature. This is a sample example of proxyonce mode.
* In this example your application (**System under test**) is dependent on application (**real service**).
* You insert mountebank in between the two applications.
* Now when your test triggers your application to make a call to real service, mountebank will intercept and record the call and the response.
* It will save it and on the second run mountebank is aware of the call and will the serve the response right back from the mountebank imposter without needing to go to the original service.

![ProxyOnce](https://git.rockfin.com/QAPOW/mountebank-examples/blob/master/RecordReplay/images/mb_record.jpg)


###### Proxy Modes:
1. ProxyOnce - will capture the data once and ignore every additional call until recording stops.
2. ProxyAlways - will capture the data every single call and record it until recording stops.
3. ProxyTransparent - will not capture any data, just transfers your call to real service.

Additional details on recording can be [found here](http://www.mbtest.org/docs/api/proxies#proxy-modes).

#### Setup Requirements:
* Mountebank Server (Docker or Local Instance)
* Postman

#### Setup Instructions:
- *Startup-Mountebank-Server*
	* Start local mountebank server by entering the following command in your terminal  `mb`
	* You should see something similar output in the terminal
	 `info: [mb:2525] mountebank v2.1.0 now taking orders - point your browser to http://localhost:2525/ for help`
	* Awesome now you have your mb server up and ready
- *Setup-MounteBank-Recording*
	* Open Postman
	* Create a new **POST** request
	* Enter the following in request URL field `http://127.0.0.1:2525/imposters`
	* Add the following header to your request `Content-Type: application/json`
	* Add the following to your post body
        ```json
        {
            "port": 6568,
            "protocol": "https",
            "name": "MyRecording",
            "stubs": [
                {
                    "responses": [
                        {
                            "proxy": {
                                "to": "https://rickandmortyapi.com/api/",
                                "mode": "proxyOnce",
                                "predicateGenerators": [
                                    {
                                        "matches": {
                                            "method": true,
                                            "path": true,
                                            "query": true
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            ]
        }
        ```
	* Submit the Post request
	* You should get a response **201** from the request.
	* Mountebank is now ready to record any traffic going to rick `https://rickandmortyapi.com/api/`
- *Record-Traffic*
	* Create a new Postman **GET** Request
	* Send request to `https://localhost:6568/api/character/5`
	* You should get a response **200** from the request.
	* Record any additional responses you would like to capture
- *Save-Recording*
	* Open a new terminal window
	* Enter the following command to save the recording `mb save --savefile recording.json`
	* Mountebank will save the recording in the current working directory of terminal
- *Replay-Recording*
	* Now you can use the recording to test your calls without relying on the actual service.
	* Shutdown the mb server
	* Open the recording file - update a response field.
		* Example `\"name\":\"Jerry Smith\"` updated to `\"name\":\"Mock Response\"`
	* Save the file
	* Start mountebank server with following command `mb --configfile recording.json`
	* Send  GET request again to `https://localhost:6568/api/character/5`
	* You should see the name field update this time around.
