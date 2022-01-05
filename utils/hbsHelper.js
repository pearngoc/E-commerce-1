const { handlebars } = require("hbs");

module.exports = () => {
  handlebars.registerHelper("getPagination", (options) => {
    const result = [];
    const pagination = options.data.root.pagination;
    const curPage = options.data.root.curPage;
    const url = options.data.root.url;


    for (let page of pagination.pages) {
      result.push(
        `<li class="page-item"><button class="page-link navButtons"  id="${page}">${page}</button></li>`
      );
    }


    return new handlebars.SafeString(result.join(""));
  });

  handlebars.registerHelper("ifIn", (item, list) => {
    if (list.indexOf(item) !== -1) return new handlebars.SafeString("checked");
  });
};
