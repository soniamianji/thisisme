const sendRequest = require("./sendRequests");

module.exports.searchCards = async function(name, occupation) {
  let response;

  try {
    response = await sendRequest.sendRequest(
      "GET",
      "/cardSearch?name=" + name + "&occupation=" + occupation
    );
  } catch (errors) {
    errors = [errors];
    return;
  }

  let errors = [];
  let cards = [];

  switch (response.status) {
    case 200:
      cards = response.json();
      console.log(cards);
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown status code"];
  }

  return cards;
};
