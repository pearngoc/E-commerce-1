const element2 = document.getElementById('formChangeProfile')
element2.addEventListener('submit', (event) => {
  event.preventDefault()

  const id = document.getElementById('profileFormId').value
  const username = document.getElementById('profileFormUsername').value
  const email = document.getElementById('profileFormEmail').value
  const phone = document.getElementById('profileFormPhone').value
  const address = document.getElementById('profileFormAddress').value
  $.ajax({
    url: '/me/updateProfile',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({id, username, email, phone, address }),
    success: (rs) => {
      console.log(rs)
      if(!rs.message){
        $('#profileFormError').html(`
        <div class='row mt-2 alert alert-success alert-dismissible fade show'>
              Updated successful!
        </div>
        `)
      }else{
        $('#profileFormError').html(`
        <div class='row mt-2 alert alert-warning alert-dismissible fade show'>
          ${rs.message}
        </div>
        `)       
      }
      
    }
  })
})
