# Behaviors

Behaviors postprocess the responses before sending it back.

#### Types of Behaviors

| Behavior | Description |
| -------- | ----------- |
| decorate | Uses a JavaScript function to postprocess the response |
| shellTransform | Sends the response through a commandline pipeline for postprocessing |
| wait | Adds latency to a response |
| repeat | Repeats a response multiple times |
| copy | Copies a value from the request into the response |
| lookup | Replaces data in the response with data from an external data source based on a key from the request |


You can get more information and examples in the [mountebank documentation](http://www.mbtest.org/docs/api/behaviors)

We will cover the shelltransform and lookup behaviors in the training.
