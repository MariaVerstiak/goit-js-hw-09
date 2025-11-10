const STORAGE_KEY = "feedback-form-state";
let formData = {
  email: "",
  message: "",
};

const form = document.querySelector(".feedback-form");

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = parsedData;

    form.elements.email.value = parsedData.email || "";
    form.elements.message.value = parsedData.message || "";
  } catch (error) {
    console.error("Помилка при парсингу даних з localStorage:", error);
  }
}

form.addEventListener("input", (event) => {
  const { name, value } = event.target;
  formData[name] = value.trimStart();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === "" || message === "") {
    alert("Fill please all fields");
    return;
  }

  console.log({ email, message });

  formData = { email: "", message: "" };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
