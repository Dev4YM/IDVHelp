setTimeout(function () {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = 0;

  // Add 'd-none' class after the transition ends
  preloader.addEventListener("transitionend", function () {
    preloader.classList.add("d-none");
  });
}, 1000);

// Function to handle input event in the textarea
function handleInput() {
  let inputText = document.getElementById("inputText").value;
  let colonPresent = inputText.includes(": ");
  let bCheckbox = document.getElementById("bElementCheckbox");
  let spanCheckbox = document.getElementById("spanCheckbox");
  let option2Element = document.querySelectorAll(".option2");

  // Enable or disable the checkboxes based on colon presence
  bCheckbox.disabled = !colonPresent;
  spanCheckbox.disabled = !colonPresent;

  if (!colonPresent) {
    option2Element.forEach((element) => {
      element.style.cursor = "not-allowed";
    });
  }

  // If colon is not present, uncheck the checkboxes
  if (colonPresent) {
    option2Element.forEach((element) => {
      element.style.cursor = "pointer";
    });
  }
}

function GenerateCode() {
  let inputText = document.getElementById("inputText").value;
  let wrapWithSpan = document.getElementById("spanCheckbox").checked;
  let wrapWithB = document.getElementById("bElementCheckbox").checked;
  let olRadio = document.getElementById("olRadio").checked;
  let ulRadio = document.getElementById("ulRadio").checked;
  let lines = inputText.split("\n");
  let liTabSize = "	";
  let formattedText = "";
  let checkListType;

  lines.forEach(function (line) {
    // Check if the line is not blank
    if (line.trim() !== "") {
      let parts = line.split(": ");
      if (parts.length > 1) {
        let boldText = parts[0].trim();
        let remainingText = parts.slice(1).join(": ").trim();
        if (wrapWithSpan && wrapWithB) {
          formattedText += `${liTabSize}<li><b>${boldText}</b>: ${
            wrapWithSpan ? "<span>" + remainingText + "</span>" : remainingText
          }</li>\n`;
        } else if (wrapWithSpan && !wrapWithB) {
          formattedText += `${liTabSize}<li>${boldText}: ${
            wrapWithSpan ? "<span>" + remainingText + "</span>" : remainingText
          }</li>\n`;
        } else if (!wrapWithSpan && wrapWithB) {
          formattedText += `${liTabSize}<li><b>${boldText}</b>: ${remainingText}</li>\n`;
        } else if (!wrapWithSpan && !wrapWithB) {
          formattedText += `${liTabSize}<li>${boldText}: ${remainingText}</li>\n`;
        }
      } else {
        formattedText += `${liTabSize}<li>${line.trim()}</li>\n`;
      }
    }
  });

  checkListType = olRadio
    ? `<ol>\n${formattedText}</ol>`
    : `<ul>\n${formattedText}</ul>`;

  let outputElement = document.getElementById("output");

  const delay = 1;

  let index = 0;

  function typeWriter() {
      outputElement.textContent = checkListType.substring(0, index + 1);
      index++;
      if (index < checkListType.length) {
          setTimeout(typeWriter, delay);
      }
  }

  typeWriter();

  // Show the copy button
  let copyButton = document.getElementById("copyButton");
  copyButton.classList.remove("d-none");
}

function copyOutput() {
  let outputElement = document.getElementById("output");
  let copyAlert = document.getElementById("copyAlert");
  let outputText = outputElement.textContent;

  // Create a temporary textarea element
  let tempTextarea = document.createElement("textarea");
  tempTextarea.value = outputText;

  // Append the textarea to the body
  document.body.appendChild(tempTextarea);

  // Select the text in the textarea
  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 99999); /* For mobile devices */

  // Copy the selected text
  document.execCommand("copy");

  // Remove the temporary textarea
  document.body.removeChild(tempTextarea);

  // Alert the user
  copyAlert.classList.remove("d-none");
  setTimeout(function () {
    // Hide the alert with a fade-out effect
    copyAlert.classList.add("d-none");

    // After the fade-out animation ends, add the d-none class
    copyAlert.addEventListener("animationend", function () {
      copyAlert.classList.add("d-none");
    });
  }, 2000);
}

// Add input event listener to the textarea
document.getElementById("inputText").addEventListener("input", handleInput);
