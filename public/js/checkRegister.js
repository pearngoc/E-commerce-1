
const element = document.getElementById('formRegister')
element.addEventListener('submit', (event) => {
  event.preventDefault()

  const username = document.getElementById('registerFormUsername').value
  const email = document.getElementById('registerFormEmail').value
  const password = document.getElementById('registerFormPassword').value
  const repassword = document.getElementById('registerFormRepassword').value
  $('#formLoginError').html(' ')
  $.ajax({
    url: '/register',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ username, email, password, repassword }),
    success: (rs) => {
      if(!rs){
        location.href = `http://localhost:3000/login`
      }else{
        console.log(rs)
        rs.forEach(element => {
          const item = (`
          <div class='d-flex flex-row align-items-center mb-4 flex-center alert alert-warning alert-dismissible fade show' >
            <div class='form-outline flex-fill mb-0 '>
              <i class='fas fa-exclamation-triangle mr-2'></i>${element.msg}
            </div>
          </div>
          `)
  
          $('#formLoginError').append(item)
          
        });
       
      }
      
    }
  })
})
