const getCryptoPrices = async () => {
  const cryptoSymbol = handleUserInput();
  if (cryptoSymbol) {
    addLoader();
    try {
      const response = await fetch(
        'https://data.binance.com/api/v3/ticker/24hr?symbol=' +
          cryptoSymbol.toUpperCase() +
          'EUR'
      );
      const data = await response.json();
      removeLoader();
      return data;
    } catch (error) {
      showErrorMessage(`Could not get data for ${cryptoSymbol}`);
    }
  }
};

const showUserInputField = () => {
  const usetTextInput = document.getElementById('user-text-input');
  if (document.getElementById('symbol').value === 'Other') {
    usetTextInput.style.display = 'block';
  } else {
    usetTextInput.style.display = 'none';
  }
};

const handleUserInput = () => {
  if (document.getElementById('symbol').value === 'Other') {
    userInput = document.getElementById('user-text-input').value;
    if (validateUserInput(userInput)) {
      document.getElementById('error-container').style.display = 'none';
      return userInput;
    } else {
      showErrorMessage('Not a valid crypto symbol');
    }
  } else {
    return document.getElementById('symbol').value;
  }
};

const validateUserInput = (userInput) => {
  const lettersOnlyRegex = /^[a-zA-Z]+$/;
  return lettersOnlyRegex.test(userInput);
};

const showErrorMessage = (message) => {
  const errorContainer = document.getElementById('error-container');
  errorContainer.style.display = 'block';
  errorContainer.innerHTML = message;
  hideCryptoDataContainer();
  removeLoader();
};

const getCryptoDataJson = async () => {
  // Build a json file with user's specified parameters about crypto data.
  let = jsonData = await getCryptoPrices();

  let output = '';
  const checkboxContainers =
    document.getElementsByClassName('checkbox-container');
  for (let i = 0; i < checkboxContainers.length; i++) {
    let isCheckboxChecked =
      checkboxContainers[i].getElementsByClassName('check-input')[0].checked;

    if (isCheckboxChecked) {
      let checkboxValue =
        checkboxContainers[i].getElementsByTagName('span')[0].innerHTML;
      let checkBoxId =
        checkboxContainers[i].getElementsByClassName('check-input')[0].id;
      output += `<li>${checkboxValue}: ${Number(jsonData[checkBoxId]).toFixed(
        4
      )}</li>`;
    }
    showCryptoDataContainer(output);
  }
};

const addLoader = () => {
  document.getElementById('crypto-data-list').innerHTML = '';
  document.getElementById('crypto-data-container').innerHTML +=
    '<div class="loader"></div>';
};

const removeLoader = () => {
  document
    .getElementById('crypto-data-container')
    .removeChild(document.querySelector('.loader'));
};

const showCryptoDataContainer = (cryptoData) => {
  document.getElementById('crypto-data-container').style.display = 'block';
  document.getElementById(
    'crypto-data-container-title'
  ).innerHTML = `Data for ${jsonData['symbol']}`;
  document.getElementById('crypto-data-list').innerHTML = cryptoData;
};

const hideCryptoDataContainer = () => {
  document.getElementById('crypto-data-container').style.display = 'none';
};

const clearData = () => {
  hideCryptoDataContainer();
};
