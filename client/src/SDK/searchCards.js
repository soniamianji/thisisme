const sendRequest = require("./sendRequests");

module.exports.searchCards = async function(name, occupation, callback) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/cardSearch?name=" + name + "&occupation=" + occupation
    );
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

  callback(errors, cards);
};
