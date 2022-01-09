const form = document.getElementById('productComment')
const productInput = document.getElementById('producID')
const userInput = document.getElementById('userID')
const contentInput = document.getElementById('commentContent')
const usernameInput = document.getElementById('userName')
const userAvatarInput = document.getElementById('userAvatar')
const showComment = document.getElementById('commentDisplay')
const navButtons = document.getElementsByClassName('navButtons')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  let hasError = false
  const productID = productInput.value
  const userID = userInput.value
  const avatar = userAvatarInput.value
  const username = usernameInput.value
  const content = contentInput.value
  if (!userID) hasError = true

  

  // console.log(req.locals.user.avatar);

  if (!hasError) {
    const data = {
      productID,
      userID,
      content,
    }
    fetch('/comment/postComment', {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(data),
    })
    showComment.insertAdjacentHTML(
      'afterbegin',
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
  } else {
    const nameError = false;
    const commentNameInput = document.getElementById('nameComment')
    const commentNameError = document.getElementById('nameCommentError')
    const name = commentNameInput.value
    if(name){
      commentNameError.innerHTML = "";
    }
    else {
      commentNameError.innerHTML = "*Require";
      nameError = true;
    }
    if(!nameError){
      const data = {
        productID,
        name,
        content,
      }
      fetch('/comment/postCommentAnonymous', {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(data),
      })
      showComment.insertAdjacentHTML(
        'afterbegin',
        `<div class="flex-w flex-t p-b-30">
                                              <div class="wrap-pic-fix size-109 bor0 of-hidden m-r-18 m-t-6">
                                              <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="AVATAR">
                                              </div>
  
                                              <div class="size-207">
                                                  <div class="flex-w flex-sb-m p-b-17">
                                                      <span class="mtext-107 cl2 p-r-20">
                                                          ${name}
                                                      </span>
                                                  </div>
                                                  <p class="stext-102 cl6">
                                                      ${content}
                                                  </p>
                                              </div>
                                          </div>`
      )
    }
  }
})
const productID = productInput.value
for (let btn of navButtons) {
  btn.addEventListener('click', () => {
   
    $.ajax({
      type: 'POST',
      url: '/comment/getComment',
      data: {
        productID: productID,
        perPage: 10,
        page: btn.id,
      },
      success: function (result) {
        showComment.innerHTML = ''
        for (let comment of result) {
         
          if(comment.userID){
            showComment.insertAdjacentHTML(
              'beforeend',
              `<div class="flex-w flex-t p-b-30">
                                              <div class="wrap-pic-fix size-109 bor0 of-hidden m-r-18 m-t-6">
                                                  <img src="${comment.userID.avatar}" alt="AVATAR">
                                              </div>

                                              <div class="size-207">
                                                  <div class="flex-w flex-sb-m p-b-17">
                                                      <span class="mtext-107 cl2 p-r-20">
                                                          ${comment.userID.username}
                                                      </span>
                                                  </div>
                                                  <p class="stext-102 cl6">
                                                      ${comment.content}
                                                  </p>
                                              </div>
                                          </div>`
            )
          }
          else{
           
            showComment.insertAdjacentHTML(
              'beforeend',
              `<div class="flex-w flex-t p-b-30">
                                              <div class="wrap-pic-fix size-109 bor0 of-hidden m-r-18 m-t-6">
                                                  <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="AVATAR">
                                              </div>

                                              <div class="size-207">
                                                  <div class="flex-w flex-sb-m p-b-17">
                                                      <span class="mtext-107 cl2 p-r-20">
                                                          ${comment.name}
                                                      </span>
                                                  </div>
                                                  <p class="stext-102 cl6">
                                                      ${comment.content}
                                                  </p>
                                              </div>
                                          </div>`
            )
          }
        }
      },
      error: function (result) {
        alert('error')
      },
    })
  })
}
