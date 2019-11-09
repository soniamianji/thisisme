//getAll cards
module.exports.getAllCards = async function(callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/cardRoute");
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let cards = [];

  switch (response.status) {
    case 200:
      cards = response.body;
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown status code"];
  }

  callback(errors, compounds);
};

//createCards
module.exports.createCard = async function(cardData, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("POST", "/cardRoute", cardData);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let id = -1;

  switch (response.status) {
    case 201:
      // const locationHeader = response.headers.get("Location");
      // id = parseInt(locationHeader.substr("/observations/".length));
      break;

    case 400:
      errors = response.errors;
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, id);
};

//editCards
module.exports.updateCard = async function(id, cardData, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "PUT",
      "/cardRoute/" + id,
      cardData
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 400:
      errors = response.errors;
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors);
};

//deleteCards
module.exports.deleteCard = async function(id, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest("DELETE", "/cardRoute/" + id);
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];

  switch (response.status) {
    case 204:
      break;

    case 400:
      errors = response.errors;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
      break;
  }

  callback(errors);
};
