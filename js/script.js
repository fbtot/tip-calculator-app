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
 */

// document elements
const billInput = document.getElementById("bill");
const tipButton = document.getElementsByClassName("calculator__tip-percent-radio");
const tipInput = document.getElementById("calculator__tip-percent--input");
const peopleInput = document.getElementById("people");
const tipTotalEl = document.getElementById("total");
const tipPerPerson = document.getElementById("tip-per-person");

const bill = () => parseFloat(billInput.value); // Total bill
// retrieve the percent number of the selected percent or input
const tipPercent = () => {
  if (tipInput.value) return parseFloat(tipInput.value);
  for (button of tipButton) {
    if (button.checked) return parseFloat(button.getAttribute("data-percent"));
  }
};

const people = () => parseFloat(peopleInput.value); // Number of people

// uncheck buttons and delet value in input
function uncheck() {
  for (button of tipButton) {
    button.checked = false;
  }
  tipInput.value = "";
}

// Calculations

function tipAmount() {
  const tips = (bill() / 100) * tipPercent();
}

function totalPerPerson() {
  return tipAmount() / people();
}
