async function getCryptoPrices() {
  const cryptoSymbol = handleUserInput();
  if (cryptoSymbol) {
    // fetch here
  }

  // fetch(
  //   "https://data.binance.com/api/v3/ticker/24hr?symbol=" +
  //     cryptoSymbol.toUpperCase() +
  //     "EUR"
  // ).then((response) => {
  //   if (!response.ok) console.log("there was an error");
  //   console.log(response.json());
  // });

  // const data = await response.json();
  // console.log(data);
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
    const errorContainer = document.getElementById("error-container");
    if (validateUserInput(userInput)) {
      errorContainer.style.display = "none";
      return userInput;
    } else {
      document.getElementById("error-message").innerHTML =
        "Not a valid crypto symbol";
      errorContainer.style.display = "block";
    }
  } else {
    return document.getElementById("symbol").value;
  }
}

function validateUserInput(userInput) {
  const lettersOnlyRegex = /^[a-zA-Z]+$/;
  return lettersOnlyRegex.test(userInput);
}
