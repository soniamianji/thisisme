const sendRequest = require("./sendRequests");

//get user  cards
module.exports.getUserCard = async function (id) {
  let response;

  try {
    response = await sendRequest.sendRequest("GET", "/cardRoute");
  } catch (errors) {
    console.log(errors)
    return;
  }

  let errors = [];
  let card = [];

  switch (response.status) {
    case 200:
      card = response.json();
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown status code"];
  }

  return card;
};

//createCards
module.exports.createCard = async function (cardData, callback) {
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
module.exports.updateCard = async function (id, cardData, callback) {
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
module.exports.deleteCard = async function (id, callback) {
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
