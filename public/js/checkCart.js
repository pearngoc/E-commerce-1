const element4 = document.getElementById('formCart')
element4.addEventListener('submit', (event) => {
  event.preventDefault()

  const cart = document.getElementById('formCarts').value
  const idCart = document.getElementById('formCartId').value
  const phoneNumber = document.getElementById('formCartPhone').value
  const address = document.getElementById('formCartAddress').value
  const paypal = document.getElementById('formCartPaypal').value
  const card_number = document.getElementById('formCartNumber').value
  const expiry_date = document.getElementById('formCartExpiry').value
  const cvc = document.getElementById('formCartCsc').value

  $.ajax({
    url: '/check-out',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      cart,
      idCart,
      phoneNumber,
      address,
      paypal,
      card_number,
      expiry_date,
      cvc,
    }),
    success: (rs) => {
      console.log(rs)
      if (rs.success) {
        location.href = `http://localhost:3000/me/orders/details/${rs.success}`
      }
      else if (rs.message) {
        $('#formCartNotification').html(`
          <div class="flex-w flex-t p-t-10 p-b-5">
            <div class="alert alert-warning alert-dismissible fade show"><i class="fas fa-exclamation-triangle mr-2"></i>${rs.message}</div>
          </div>
          `)
      } else if (rs.message1) {
        $('#formCartInformation').html(`
          <div class="flex-w flex-t p-t-10 p-b-5">
            <div class="alert alert-warning alert-dismissible fade show"><i class="fas fa-exclamation-triangle mr-2"></i>${rs.message1}</div>
          </div>
          `)
      }
      else if(!rs.message2){
        location.href = `http://localhost:3000/login`
        alert('Please checkout before login')
      }
      
    },
  })
})
