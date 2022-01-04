const { handlebars } = require("hbs");

module.exports = () => {
  handlebars.registerHelper("getPagination", (options) => {
    const result = [];
    const pagination = options.data.root.pagination;
    const curPage = options.data.root.curPage;
    const url = options.data.root.url;

    result.push(
      `<li class="page-item ${
        curPage === 1 && "disabled"
      }"><a class="page-link" href="${curPage === 1 ? "" : `${url}?page=`}${
        curPage === 1 ? "" : curPage - 1
      }" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    );

    for (let page of pagination.pages) {
      result.push(
        `<li class="page-item ${
          page === curPage && "active"
        }"><a class="page-link" href="${url}?page=${page}">${page}</a></li>`
      );
    }

    result.push(
      `<li class="page-item ${
        curPage === Math.ceil(pagination.total / pagination.perPage) &&
        "disabled"
      }"><a class="page-link" href="${
        curPage === Math.ceil(pagination.total / pagination.perPage)
          ? ""
          : `${url}?page=`
      }${
        curPage === Math.ceil(pagination.total / pagination.perPage)
          ? ""
          : curPage + 1
      }" aria-label="Previous"><span aria-hidden="true">&raquo;</span></a></li>`
    );

    return new handlebars.SafeString(result.join(""));
  });

  handlebars.registerHelper("ifIn", (item, list) => {
    if (list.indexOf(item) !== -1) return new handlebars.SafeString("checked");
  });
};
