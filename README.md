## Trade offs

- Using Meteos own library to consume weather data
- Error handling / logging
- I've not added in any configuration yet on api calls to allow more results / mroe than 7 days a week
- Minimal package use to not get too toghtly coupled to any frameworks (apollo graphql etc)
- Create abstractions to openmeteo for loose coupling
- Docker container for portability
- Lightweight testing
