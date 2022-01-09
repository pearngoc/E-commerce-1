const element5 = document.getElementById("formLogin");
element5.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("formLoginUsername").value;
  const password = document.getElementById("formLoginPassword").value;

  $.ajax({
    url: "/login",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ username, password }),
    success: (rs) => {
      console.log(rs);
      if (!rs.message) {
        location.href = `https://e-commerce-ptudw.herokuapp.com/`;
      } else {
        $("#formLoginNotification").html(`
          <div class="form-outline mb-4">
            <div class="alert alert-warning alert-dismissible fade show"><i class="fas fa-exclamation-triangle mr-2"></i>${rs.message}</div>
          </div>
          `);
      }
    },
  });
});
