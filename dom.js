import { showTodoList } from "./display.js";
import { currentProject } from "./main.js";
import {
  deleteTodo,
  editTodo,
  saveFormData,
  STORE_NAMES,
} from "./indexedDB.js";
const leftSideBar = document.getElementById("left-sideBar");

export function createProjectButton(projectName) {
  const button = document.createElement("button");
  button.id = projectName;
  button.classList.add("button");
  button.textContent = projectName;
  return button;
}

export function projectNameForm() {
  const form = document.createElement("form");
  form.id = "projectNameForm";
  const label = document.createElement("label");
  label.textContent = "Enter project name";
  label.htmlFor = "projectNameInput";
  const input = document.createElement("input");
  input.id = "projectNameInput";
  input.type = "text";
  input.name = "name";
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.style.display = "block";

  submitBtn.textContent = "submit";
  form.append(label, input, submitBtn);
  return form;
}

export function appendNewProjectOnLefSideBar(newProjectBtn) {
  leftSideBar.appendChild(newProjectBtn);
}

export function NewToDoForm() {
  const form = document.createElement("form");
  form.classList.add("todo-form");
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "title";
  titleLabel.htmlFor = "titleId";
  const title = document.createElement("input");
  title.id = "titleId";
  title.type = "text";
  title.placeholder = "title";
  title.name = "title";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.for = "descriptionId";
  descriptionLabel.textContent = "description";
  const description = document.createElement("input");
  description.type = "textArea";
  description.id = "descriptionId";
  description.name = "description";

  const dueDateLabel = document.createElement("label");
  dueDateLabel.textContent = "dueDate";
  dueDateLabel.for = "dueDateId";
  const dueDate = document.createElement("input");
  dueDate.type = "date";
  dueDate.id = "dueDateId";
  dueDate.name = "dueDate";

  const prioritySelect = document.createElement("select");
  prioritySelect.id = "priorityId";
  prioritySelect.name = "priority";

  const highOption = document.createElement("option");
  highOption.value = "High";
  highOption.textContent = "High";
  highOption.selected = true; // Set High as the default

  const mediumOption = document.createElement("option");
  mediumOption.value = "Medium";
  mediumOption.textContent = "Medium";

  const lowOption = document.createElement("option");
  lowOption.value = "Low";
  lowOption.textContent = "Low";

  // Append options to the select element
  prioritySelect.appendChild(highOption);
  prioritySelect.appendChild(mediumOption);
  prioritySelect.appendChild(lowOption);

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Submit";
  form.append(
    titleLabel,
    title,
    descriptionLabel,
    description,
    dueDateLabel,
    dueDate,
    prioritySelect,
    submit,
  );
  return form;
}

export function createDiv(param) {
  const div = document.createElement("div");
  div.textContent = param;
  return div;
}

//gpt code
export function createTodo(todo) {
  const todoContainer = document.createElement("div");
  todoContainer.className = "todo-item";

  // Display elements (read-only mode)
  const titleDisplay = document.createElement("h4");
  titleDisplay.textContent = todo.title || "Untitled";

  const descriptionDisplay = document.createElement("p");
  descriptionDisplay.textContent = todo.description || "";

  const dueDateDisplay = document.createElement("small");
  dueDateDisplay.textContent = todo.dueDate ? `Due: ${todo.dueDate}` : "";

  const priorityDisplay = document.createElement("span");
  priorityDisplay.textContent = todo.priority
    ? `Priority: ${todo.priority}`
    : "";

  // Editable elements (edit mode)
  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.value = todo.title || "";
  titleInput.style.display = "none";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.value = todo.description || "";
  descriptionInput.style.display = "none";

  const dueDateInput = document.createElement("input");
  dueDateInput.type = "date";
  dueDateInput.value = todo.dueDate || "";
  dueDateInput.style.display = "none";

  const prioritySelect = document.createElement("select");
  ["High", "Medium", "Low"].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    if (level === todo.priority) option.selected = true;
    prioritySelect.appendChild(option);
  });
  prioritySelect.style.display = "none";

  // Append everything to the container
  todoContainer.appendChild(titleDisplay);
  todoContainer.appendChild(titleInput);
  todoContainer.appendChild(descriptionDisplay);
  todoContainer.appendChild(descriptionInput);
  todoContainer.appendChild(dueDateDisplay);
  todoContainer.appendChild(dueDateInput);
  todoContainer.appendChild(priorityDisplay);
  todoContainer.appendChild(prioritySelect);

  //creating a back button for going back to the first page.
  const backButton = document.createElement("button");
  backButton.type = "button";
  backButton.id = "back-button";
  backButton.textContent = "BACK";
  todoContainer.appendChild(backButton);

  //creating a delete button .
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.id = "delete-button";
  deleteButton.textContent = "delete";
  todoContainer.appendChild(deleteButton);

  //edit button
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.id = "edit-button";
  editButton.textContent = "edit";
  todoContainer.appendChild(editButton);

  backButton.addEventListener("click", () => showTodoList(currentProject.name));
  deleteButton.addEventListener("click", () => {
    backButton.click();
    deleteTodo(todo.list_no);
  });
  editButton.addEventListener("click", () => {
    // Hide display elements and show editable elements
    titleDisplay.style.display = "none";
    descriptionDisplay.style.display = "none";
    dueDateDisplay.style.display = "none";
    priorityDisplay.style.display = "none";

    titleInput.style.display = "block";
    descriptionInput.style.display = "block";
    dueDateInput.style.display = "block";
    prioritySelect.style.display = "block";

    // Hide edit/delete buttons, show save button
    editButton.style.display = "none";
    deleteButton.style.display = "none";
    saveButton.style.display = "block";
  });
  const saveButton = document.createElement("button");
  saveButton.textContent = "save";
  saveButton.style.display = "none";
  saveButton.addEventListener("click", async () => {
    // Get the new data
    const updatedData = {
      title: titleInput.value.trim(),
      description: descriptionInput.value.trim(),
      dueDate: dueDateInput.value,
      priority: prioritySelect.value,
      projectId: todo.projectId,
      list_no: todo.list_no,
    };

    await editTodo(updatedData, STORE_NAMES.TO_DO);

    // Update display elements with new data
    titleDisplay.textContent = updatedData.title;
    descriptionDisplay.textContent = updatedData.description;
    dueDateDisplay.textContent = updatedData.dueDate
      ? `Due: ${updatedData.dueDate}`
      : "";
    priorityDisplay.textContent = updatedData.priority
      ? `Priority: ${updatedData.priority}`
      : "";

    // Hide editable elements and show display elements
    titleDisplay.style.display = "block";
    descriptionDisplay.style.display = "block";
    dueDateDisplay.style.display = "block";
    priorityDisplay.style.display = "block";

    titleInput.style.display = "none";
    descriptionInput.style.display = "none";
    dueDateInput.style.display = "none";
    prioritySelect.style.display = "none";

    // Show edit/delete buttons, hide save button
    editButton.style.display = "block";
    deleteButton.style.display = "block";
    saveButton.style.display = "none";
  });

  todoContainer.appendChild(saveButton);

  return todoContainer; // return so caller can append it to DOM
}
