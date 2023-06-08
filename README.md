Project brief

- Use 3 public apis from the free open no auth needed apis list.
- For each public API, create a form that can take user input from either text input, radiobuttons, select, and/or checkbox elements.
- The values from the form should affect the api request.
- Display the return values of the API request on the DOM, so the user can see them in a visually.
- While waiting for the API response, add a loading spinner. Once you have received the API response, remove the loading spinner.
- If the input to the API is correct, but the API does not return any truthful response, notify the user – sometimes this can be because the response is empty (e.g. https://api.nationalize.io/?name=Opadiii), but sometimes it can be because of a 4xx (e.g. 400) response code.

Resources

- APIs list: https://mixedanalytics.com/blog/list-actually-free-open-no-auth-needed-apis/
  - Binance crypto 24h changes: https://data.binance.com/api/v3/ticker/24hr?symbol=BTCEUR
- https://www.freecodecamp.org/news/javascript-dom-manipulation/

TODO:

- finish buildUserSelectionJson function
