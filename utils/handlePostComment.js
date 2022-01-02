const form = document.getElementById("productComment");
const productInput = document.getElementById("producID");
const userInput = document.getElementById("userID");
const contentInput = document.getElementById("commentContent");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let hasError = false;
  const productID = productInput.value;
  const userID = userInput.value;
  const content = contentInput.value;
    if(!userID) hasError = true;

  const data = {
    productID,
    userID,
    content
  };

  console.log({ data });

  if (!hasError) {
    fetch("/comment/postComment", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  }
  else {
    window.location = "/login";
  }
});
