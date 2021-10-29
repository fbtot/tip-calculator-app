/* ========================== § DOM ELEMENTS === */
const billInput = document.getElementById("bill");
const tipButton = document.getElementsByClassName("calculator__tip-percent-radio");
const tipInput = document.getElementById("calculator__tip-percent--input");
const peopleInput = document.getElementById("people");
const tipTotalEl = document.getElementById("tip-total");
const tipPerPerson = document.getElementById("tip-per-person");
const resetButton = document.getElementById("reset-button");

/* ========================== § RETRIEVE DATA FROM INPUTS === */
function bill() {
  return Number(billInput.value);
}

// if something is written in the input field, retrieve that, else retrieve the "data-percent" attribute of the selected button
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

/* ========================== § CHECKS === */
// are there buttons checked?
function checkedButtons() {
  return Array.from(tipButton).some((el) => el.checked);
}

// is there something written in the input fields?
function somethingWritten(where) {
  if (where === "everywhere") {
    return tipPercent() > 0 && people() > 0 && bill() > 0;
  } else if (where === "somewhere") {
    return tipPercent() > 0 || people() > 0 || bill() > 0;
  }
}

function errorMsg(element) {
  return element.previousElementSibling;
}

// if the variable reset is set with the keyword reset, remove the class error, regardless of the content of the input, else add the class error if the input is falsy, remove it if it's truthy
function validateInputs(reset) {
  [billInput, peopleInput].forEach((el) => {
    if (reset === "reset") {
      errorMsg(el).classList.remove("error");
      el.classList.remove("error");
    } else {
      if (el.value < 1 || el.value === "") {
        errorMsg(el).classList.add("error");
        el.classList.add("error");
      } else if (el.value) {
        errorMsg(el).classList.remove("error");
        el.classList.remove("error");
      }
    }
  });
}

/* ========================== § RESULTS === */
function tipAmount() {
  if (somethingWritten("everywhere")) {
    return ((bill() / 100) * tipPercent()) / people();
  } else {
    return 0;
  }
}

function totalPerPerson() {
  return tipAmount() > 0 ? tipAmount() + bill() : 0;
}

/* ========================== § FUNCTIONALITY === */
// make the reset button clickable when a button is selected or an input has a value
function toggleResetButton() {
  if (somethingWritten("somewhere") || checkedButtons()) {
    resetButton.classList.remove("unclickable");
    resetButton.classList.add("active");
  } else {
    resetButton.classList.add("unclickable");
    resetButton.classList.remove("active");
  }
}

// reset cancel all the contents of inputs and deselect buttons
function reset() {
  billInput.value = "";
  peopleInput.value = "";
  tipInput.value = "";
  uncheckButtons();
}

// display the results
function updateResults() {
  tipTotalEl.innerText = tipAmount().toFixed(2);
  tipPerPerson.innerText = totalPerPerson().toFixed(2);
  toggleResetButton();
  validateInputs();
}

// uncheck all buttons
function uncheckButtons() {
  for (let i = 0; i < tipButton.length; i++) {
    tipButton[i].checked = false;
  }
}

/* ========================== § EVENTS === */
[billInput, peopleInput, tipInput].forEach((el) => {
  el.addEventListener("keyup", function (e) {
    return updateResults();
  });

  el.addEventListener("keydown", function (e) {
    if (e.key.match(/\.|e/)) {
      return e.preventDefault();
    }
  });
});

Array.from(tipButton).forEach((el) => {
  el.addEventListener("click", function () {
    return updateResults();
  });
});

tipInput.addEventListener("click", function () {
  uncheckButtons();
});

resetButton.addEventListener("click", function () {
  return reset(), updateResults(), validateInputs("reset");
});
