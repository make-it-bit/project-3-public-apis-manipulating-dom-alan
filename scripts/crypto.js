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
      addLoader();
      return data;
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

async function getCryptoDataJson() {
  // Build a json file with user's specified parameters about crypto data.
  jsonData = await getCryptoPrices();

  let output = "";
  const checkboxContainers =
    document.getElementsByClassName("checkbox-container");
  for (let i = 0; i < checkboxContainers.length; i++) {
    let isCheckboxChecked =
      checkboxContainers[i].getElementsByClassName("check-input")[0].checked;

    if (isCheckboxChecked) {
      let checkboxValue =
        checkboxContainers[i].getElementsByTagName("span")[0].innerHTML;
      let checkBoxId =
        checkboxContainers[i].getElementsByClassName("check-input")[0].id;
      output += `<li>${checkboxValue}: ${Number(jsonData[checkBoxId]).toFixed(
        4
      )}</li>`;
    }
  }
  document.getElementById("crypto-data-container").style.display = "block";
  document.getElementById(
    "crypto-data-container-title"
  ).innerHTML = `Data for ${jsonData["symbol"]}`;
  document.getElementById("crypto-data-list").innerHTML = output;
}

function addLoader() {
  document.getElementById("crypto-data-container").innerHTML +=
    '<div class="loader"></div>';
}

function removeLoader() {
  document
    .getElementById("crypto-data-container")
    .removeChild(document.querySelector(".loader"));
}
