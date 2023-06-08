async function getCryptoPrices() {
  const cryptoSymbol = handleUserInput();
  if (cryptoSymbol) {
    try {
      const response = await fetch(
        "https://data.binance.com/api/v3/ticker/24hr?symbol=" +
          cryptoSymbol.toUpperCase() +
          "EUR"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      showErrorMessage(`Could not get data for ${cryptoSymbol}`);
    }
  }
}

function showUserInputField() {
  const usetTextInput = document.getElementById("user-text-input");
  if (document.getElementById("symbol").value === "Other") {
    usetTextInput.style.display = "block";
  } else {
    usetTextInput.style.display = "none";
  }
}

function handleUserInput() {
  if (document.getElementById("symbol").value === "Other") {
    userInput = document.getElementById("user-text-input").value;
    if (validateUserInput(userInput)) {
      document.getElementById("error-container").style.display = "none";
      return userInput;
    } else {
      showErrorMessage("Not a valid crypto symbol");
    }
  } else {
    return document.getElementById("symbol").value;
  }
}

function showErrorMessage(message) {
  const errorContainer = document.getElementById("error-container");
  errorContainer.style.display = "block";
  errorContainer.innerHTML = message;
}

function validateUserInput(userInput) {
  const lettersOnlyRegex = /^[a-zA-Z]+$/;
  return lettersOnlyRegex.test(userInput);
}
