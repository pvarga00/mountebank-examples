# Service Virtualization with MounteBank

To get additional details about mountebank head over to the official documentation here - [LINK](https://shorty/sv)

#### What does this repo provide me?
This repo provides examples and documentation on different types of mock setups

#### How can I use this repo?
This repo provides examples and documentation on how to setup different modes of mocking in MounteBank

#### Quick Terminology used in MounteBank and this Guide:
The official terminology by mountebank can be found in the [documentation here](http://www.mbtest.org/docs/mentalModel)
  - Imposter: mock representing your entire api/application.
  - Stub: a complete block of code capturing your request and response information
  - Predicate: request information to be matched against (Part of a stub)
  - Response: response that should be send back (Part of a stub)

#### Types of setups:
  - Easiest Setup: [Record and replay](RecordReplay/)
  - Moderate Setup: [Predicate matching](PredicateMatching/), [Modularized Setup](ModularizedSetup/)
  - Expert Setup: [Predicate/Response Injection](Injection/), [Behaviors](Behaviors/)

#### Guide Flow:
The documentation starts with the easiest and builds on the sample examples and continues enhancing them.

###### Suggested Flow:
1. [Record and replay](RecordReplay/)
2. [Predicate matching](PredicateMatching/)
3. [Modularized Mocks](ModularizedSetup/)
4. [Injection](Injection/)
5. [Behaviors](Behaviors/)

#### Case Study:
Examples of Mountebank setups:
  - RM Mobile: [Git](https://git.rockfin.com/Hydra/RMM-APP-UIAutomation/tree/master/mocks)
  - RM Application and Origination: [Git](https://git.rockfin.com/RocketMortgage/ServiceMocking/)
  - FinEx Mountebank: [Git](https://git.rockfin.com/otpod/mountebank-finex)

#### Additional help
For any additional help please reach out to It Team QAPOW via [Email](ITTeamQAPOW@Quickenloans.com) or [Teams Room](https://teams.microsoft.com/l/team/19%3a00f5199ea282405a877fd7915e45f3bc%40thread.skype/conversations?groupId=5a5da90f-7f86-49da-87de-d84eba0474f8&tenantId=e58c8e81-abd8-48a8-929d-eb67611b83bd)
