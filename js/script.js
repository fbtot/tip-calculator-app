/**TO DO
 * retrieve percent
 * deselect buttons if input is clicked
 * cancel input content if button is clicked
 * if bill or number of people is zero, throw an error
 * store bill, percent and number of people in three variables
 * bill / 100 * percent = tot tip amount
 * tot tip amount / numer of people = tip per person
 * maybe i could add an opition to round the result
 * when click on reset, deselect all buttons and reset all inputs.
 * every time i click on a tip button or change something in the inputs, the calculator should update.
 */

// document elements
const billInput = document.getElementById("bill");
const tipButton = document.getElementsByClassName("calculator__tip-percent-radio");
const tipInput = document.getElementById("calculator__tip-percent--input");
const peopleInput = document.getElementById("people");
const tipTotalEl = document.getElementById("tip-total");
const tipPerPerson = document.getElementById("tip-per-person");
const resetButton = document.getElementById("reset-button");

// retrieve data
function bill() {
  return Number(billInput.value);
}

function tipPercent() {
  if (tipInput.value !== "") {
    return Number(tipInput.value);
  } else {
    const tipValue = Array.from(tipButton)
      .filter((el) => el.checked)
      .map((el) => el.getAttribute("data-percent"));
    return Number(tipValue);
  }
}

function people() {
  return Number(peopleInput.value);
}

// results

function tipAmount() {
  if (tipPercent() > 0 || people() > 0 || bill() > 0) {
    return ((bill() / 100) * tipPercent() * people()).toFixed(2);
  } else {
    return "0.00";
  }
}

function totalPerPerson() {
  return tipAmount() > 0 ? (tipAmount() / people()).toFixed(2) : "0.00";
}

function toggleResetButton() {
  if (tipPercent() > 0 || people() > 0 || bill() > 0) {
    resetButton.classList.remove("unclickable");
  } else {
    resetButton.classList.add("unclickable");
  }
}

function reset() {
  billInput.value = "";
  peopleInput.value = "";
  tipInput.value = "";
  Array.from(tipButton).forEach((el) => (el.checked = false));
}

function updateResults() {
  tipTotalEl.innerText = tipAmount();
  tipPerPerson.innerText = totalPerPerson();
  toggleResetButton();
}

// Events
[billInput, peopleInput, tipInput].forEach((el) => {
  el.addEventListener("keyup", function () {
    return updateResults();
  });
});

resetButton.addEventListener("click", function () {
  return reset(), updateResults();
});
