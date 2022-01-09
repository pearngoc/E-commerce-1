const element6 = document.getElementById("formResetPassword");
element6.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("formResetPasswordEmail").value;

  $.ajax({
    url: "/reset-password",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ email }),
    success: (rs) => {
      console.log(rs);
      if (!rs.message) {
        location.href = `https://e-commerce-ptudw.herokuapp.com/reset-password`;
      } else {
        $("#formResetPasswordEmailNotification").html(`
          <div class="form-outline mb-4">
            <div class="alert alert-warning alert-dismissible fade show"><i class="fas fa-exclamation-triangle mr-2"></i>${rs.message}</div>
          </div>
          `);
      }
    },
  });
});
