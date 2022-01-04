const PAGE = require("../constants/page")

module.exports = {
    getPagination: (curPage, total) => {
        const pagination = {
            atBegin: false,
            atLast: false,
            perPage: PAGE.perPage,
            total: total,
            pages: []
        }
        const pages = [curPage]
        const keys = []


        for (let i = 1; i <= PAGE.pageBefore; i++) {
            if (curPage - i <= 0) {
                pagination.atBegin = true;
                break;
            }
            pages.unshift(curPage - i)      
        }

        for (let i = 1; i <= PAGE.pageAfter; i++) {
            if (curPage + i > Math.ceil(total/PAGE.perPage)) {
                pagination.atLast = true;
                break;
            }
            pages.push(curPage + i)
        }

        for (let i = 1; i <= PAGE.perPage; i++) {
            keys.push((curPage - 1) * PAGE.perPage + i)
        }

        return {
            ...pagination,
            keys,
            pages
        }
    }
}