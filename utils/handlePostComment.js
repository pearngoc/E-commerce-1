const form = document.getElementById("productComment");
const productInput = document.getElementById("producID");
const userInput = document.getElementById("userID");
const contentInput = document.getElementById("commentContent");
const usernameInput = document.getElementById("userName");
const userAvatarInput = document.getElementById("userAvatar");
const showComment = document.getElementById("commentDisplay");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let hasError = false;
  const productID = productInput.value;
  const userID = userInput.value;
  const avatar = userAvatarInput.value;
  const username = usernameInput.value;
  const content = contentInput.value;
  if(!userID) hasError = true;

  const data = {
    productID,
    userID,
    content
  };

 // console.log(req.locals.user.avatar);

  if (!hasError) {
    fetch("/comment/postComment", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    showComment.insertAdjacentHTML('afterbegin',
                                        `<div class="flex-w flex-t p-b-30">
                                            <div class="wrap-pic-fix size-109 bor0 of-hidden m-r-18 m-t-6">
                                                <img src="${avatar}" alt="AVATAR">
                                            </div>

                                            <div class="size-207">
                                                <div class="flex-w flex-sb-m p-b-17">
                                                    <span class="mtext-107 cl2 p-r-20">
                                                        ${username}
                                                    </span>
                                                </div>
                                                <p class="stext-102 cl6">
                                                    ${content}
                                                </p>
                                            </div>
                                        </div>`
    )
  }
  else {
    window.location = `/login?redirect=${window.location.href}`;
  }
});
