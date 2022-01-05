function loadPageTable(page) {
    $(".content_table").html(" ");
    $.ajax({
      url: "/me/orders/pagination?page=" + page,
      type: "GET",
    })
      .then((rs) => {
        console.log(rs)
        rs.orders.forEach((element) => {
          const item = $(`
                  <tr>
                      <td>${element._id}</td>
                      <td>${element.createdAt}</td>                        
                      <td><span class="status text-success">&bull;</span>${element.status}</td>
                      <td>${element.totalPrice}</td>
                      <td><a href="/me/orders/details/${element._id}" class="view" title="View Details" data-toggle="tooltip"><i class="fas fa-chevron-right"></i></a></td>
                  </tr>
              `);
  
          $(".content_table").append(item);
          //console.log(element)
        });
      })
      .catch((err) => console.log(err));
  }
  
  $('#paging_table').pagination({
      dataSource: '/me/orders/pagination?page=1',
      locator: 'orders',
      totalNumberLocator: function(res){
          return res.sumPage;
      },
      pageSize: 4,
      afterPageOnClick: function(event, pageNumber){
         loadPageTable(pageNumber)
      },
      afterPreviousOnClick: function(event, pageNumber){
          console.log(pageNumber)
          loadPageTable(pageNumber)
      },
      afterNextOnClick: function(event, pageNumber){
          loadPageTable(pageNumber)
      },
      
      
  })
  loadPageTable(1)