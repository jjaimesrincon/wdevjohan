// Project 4 Website Development & Deployment
// Name: Johann Jaimes
// Date: 2023-04-26

/*
 * Handles the submit event of the contact form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
  // Hides all error elements on the page
  hideErrors();

  console.log("Hello");

  // Determine if the form has errors
  if (formHasErrors()) {
    // Prevents the form from submitting
    e.preventDefault();

    // When using onSubmit="validate()" in markup, returning false would prevent
    // the form from submitting
    return false;
  } else {
    //Sent the email. Future implementation 😅
    var element = document.getElementById("message-sent");
    element.style.display = "block";
    e.preventDefault();
  }

  // When using onSubmit="validate()" in markup, returning true would allow
  // the form to submit
  //return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
  // Confirm that the user wants to reset the form.
  if (confirm("Clear contact form?")) {
    // Ensure all error fields are hidden
    hideErrors();

    // Set focus to the first text field on the page
    document.getElementById("qty1").focus();

    // When using onReset="resetForm()" in markup, returning true will allow
    // the form to reset
    return true;
  }

  // Prevents the form from resetting
  e.preventDefault();

  // When using onReset="resetForm()" in markup, returning false would prevent
  // the form from resetting
  return false;
}

function validDataInForm(fieldId, fieldValue, fieldRegex) {
  let dataIsValid = true;
  if (!fieldRegex.test(fieldValue) && fieldValue.trim() != "") {
    console.log(fieldId + " has regex errors.");
    console.log({ fieldValue, fieldRegex });
    let cssId = document.getElementById(fieldId + "_format_error");

    cssId.style.display = "block";

    document.getElementById(fieldId).focus();
    dataIsValid = false;
  }

  return dataIsValid;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
  let hasErrors = false;
  //	Complete the validations below
  const contactFields = ["name", "phone", "email", "comments"].reverse(); //Using the reverse will focus the cursor on the first non-valid item

  let fieldRegex;
  let fieldValue;

  for (let i = 0; i < contactFields.length; i++) {
    fieldValue = document.getElementById(contactFields[i]).value;

    if (fieldValue.trim() === "") {
      document.getElementById(contactFields[i]).focus();
      document.getElementById(contactFields[i] + "_error").style.display =
        "block";
      hasErrors = true;
    } else {
      switch (contactFields[i]) {
        case "name":
          fieldRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
          if (!validDataInForm(contactFields[i], fieldValue, fieldRegex)) {
            hasErrors = true;
          }
          break;

        case "phone":
          fieldRegex = /^\d{10}$/;

          if (!validDataInForm(contactFields[i], fieldValue, fieldRegex)) {
            hasErrors = true;
          }

          break;

        case "email":
          fieldRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          if (!validDataInForm(contactFields[i], fieldValue, fieldRegex)) {
            hasErrors = true;
          }

          break;

        case "comments":
          if (contactFields[i].trim() === "") {
            hasErrors = true;
          }

          break;

        default:
          break;
      }
    }
  }

  const paymentFields = [
    "cardtype",
    "cardname",
    "month",
    "cardnumber",
  ].reverse();

  return hasErrors;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
  // Get an array of error elements
  let error = document.getElementsByClassName("error");

  // Loop through each element in the error array
  for (let i = 0; i < error.length; i++) {
    // Hide the error element by setting it's display style to "none"
    error[i].style.display = "none";
  }

  //Hide email sent DIV
  let email = document.getElementById("message-sent");
  email.style.display = "none";
}

/*
 * Handles the load event of the document.
 */
function load() {
  hideErrors();

  //Reset the form
  document.getElementById("contact-form").addEventListener("reset", resetForm);

  // Add event listener for the form submit
  document.getElementById("contact-form").addEventListener("submit", validate);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);
