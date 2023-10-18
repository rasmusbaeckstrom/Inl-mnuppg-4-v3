// My JavaScript code

// My HTML element variables
const input = document.querySelector("#todoInput");
const list = document.querySelector("ul");
const button = document.querySelector("#addTodo");
const info = document.querySelector("small");
const completedInfo = document.querySelector("p");

// My JS variables
let completedCount = 0;
const todoArray = [];
// const simpleTodoArray = [];

// Execute a function when the user presses enter key on the keyboard
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // Cancel the default action
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("addTodo").click();
  }
});

// Listen for the Add button click
button.addEventListener("click", function () {
  // Get the text from the input field
  const text = input.value;

  // Check that text is not empty. If so, display error msg
  if (text.length == 0) {
    info.innerText = "Input must not be empty";
    info.classList.add("flash");
    setTimeout(() => {
      info.classList.remove("flash");
    }, 3000);
    return;
  } else {
    info.innerText = "";
  }

  // Add todo to todoArray
  const todoObject = { name: text, status: false };
  todoArray.push(todoObject);

  /* Add todo to our simple todoArray
  simpleTodoArray.push(text);*/

  // Create li-element in ul
  const item = document.createElement("li");
  list.appendChild(item);

  // Create a span-element in our new li and add text
  const itemLabel = document.createElement("span");
  itemLabel.innerText = text;
  item.appendChild(itemLabel);

  // Create a span-element with a trash can icon
  const trashCan = document.createElement("span");
  trashCan.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  trashCan.setAttribute("class", "trashcan");
  item.appendChild(trashCan);

  // Add a listnener to toggle task completion
  itemLabel.addEventListener("click", function () {
    // Toggle completed/uncompleted
    if (item.getAttribute("class") == "completed") {
      item.setAttribute("class", "");
      completedCount--;
    } else {
      item.setAttribute("class", "completed");
      completedCount++;
    }

    completedInfo.innerText = `${completedCount} completed`;
  });

  // Add a listener to the trashcan
  trashCan.addEventListener("click", function () {
    // Set completed correct
    if (item.getAttribute("class") == "completed") {
      completedCount--;
    }
    completedInfo.innerText = `${completedCount} completed`;

    /*Set simple todoArray correct
    let removeText = item.firstChild.firstChild.textContent;
    let indexToRemove = simpleTodoArray.indexOf(removeText);
    simpleTodoArray.splice(indexToRemove, 1);*/

    // Set todoArray correct
    let removeText2 = item.firstChild.firstChild.textContent;
    let indexToRemove2 = todoArray.findIndex(function (todo) {
      return todo.name === removeText2;
    });
    if (indexToRemove2 !== -1) {
      todoArray.splice(indexToRemove2, 1);
    }

    // Remove li-element
    item.remove();
  });

  // Clear input field after add
  input.value = "";
});
