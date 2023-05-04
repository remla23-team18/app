# APP
Contains a frontend web application that brings together all pieces.

- Depends on the `lib` through a package manager (e.g., `Maven`).

- Queries the `model-service` through REST requests.

- The URL of the `model-service` is configurable as an environment variable.

- The application contains a basic web frontend that represents a sensible usecase for the `model-service`. For example, a textbox allows to enter a restaurant review. When submitted (or dynamically on change via Javascript), a request is sent to the `app`, which in turn will delegate the request to the `model-service`. The request initiates a sentiment analysis of the review. Depending on the result, a sad or a happy smiley should be shown in the frontend.

- The app should be containerized and released automatically through a GitHub workflow.
