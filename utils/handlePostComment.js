const form = document.getElementById("productComment");
const productInput = document.getElementById("producID");
const userInput = document.getElementById("userID");
const contentInput = document.getElementById("commentContent");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("AJAX");

  const producID = productInput.value;
  const userID = userInput.value;
  const content = contentInput.value;

  let hasError = false;

  if (!content) {
    hasError = true;
  }

  if (!userID) {
    hasError = true;
  }
  if (!productID) {
    hasError = true;
  }
  const data = {
    producID,
    userID,
    content,
  };

  console.log({ data });

  if (!hasError) {
    fetch("/products/comment/postComment", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  }
});
