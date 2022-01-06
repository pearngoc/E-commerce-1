


const element3 = document.getElementById('formUpdatePassword')
element3.addEventListener('submit', (event) => {
  event.preventDefault()

  const id = document.getElementById('formUpdatePasswordId').value
  const password = document.getElementById('formUpdatePasswordOld').value
  const new_password = document.getElementById('formUpdatePasswordNew').value
  const re_new_password = document.getElementById('formUpdatePasswordReNew').value
  console.log(id)
  $.ajax({
    url: '/me/change-password',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ id, password, new_password, re_new_password }),
    success: (rs) => {
        console.log(rs)
        if(!rs.message){
          $('#formUpdatePasswordNotification').html(`
          <div class='row mt-2 alert alert-success alert-dismissible fade show'>
                Updated successful!
          </div>
          `)
        }else{
          $('#formUpdatePasswordNotification').html(`
          <div class='row mt-2 alert alert-warning alert-dismissible fade show'>
            ${rs.message}
          </div>
          `)       
        }
        
      
    }
  })
})


