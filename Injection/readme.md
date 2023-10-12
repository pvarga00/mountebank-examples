# Injection

#### Background:
While Mountebank has a lot of power built into it, you can extend it even more by leveraging the injection feature. Using javascript injection allows to perform external logic that can be used as either a predicate or a response.

Although mountebank provides advanced functionality to make your stubs smarter when you need them to be, your best bet is to not need them to be so smart. The dumber your virtual services can be, the more maintainable your test architecture will be.

**Predicate Injection** - Predicate injection allows you to pass a JavaScript function to decide whether the stub should match or not. Unlike other predicates, predicate injections bind to the entire request object, which allows you to base the result on multiple fields.

**Response Injection** - Response injection allows you to dynamically construct the response based on the request and previous requests. mountebank will use the default value documented on the [protocol page](http://www.mbtest.org/docs/protocols/http) for any response fields you leave empty.

Mountebank passes the request object to both predicate and response injection functions, so you could put conditional logic based on the request in either location. Compared to response injection, predicate injection is relatively easy to use. If you need to send a static response back based on a dynamic condition, programming your own predicate and using an is response stays true to the intention of predicates in mountebank.
