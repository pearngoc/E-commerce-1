module.exports = {
  generateQueryObject: (category, sortBy, sortPrice, q) => {
    const queryObject = {}

    if (category) {
      queryObject.category = category
    }

    switch (sortBy) {
      case 'view':
        break
      case 'newness':
        break
      case 'priceAsc':
        break
      case 'priceDesc':
        break

      default:
        break
    }

    switch (sortPrice) {
      case '0':
        queryObject.price = {
          $gt: 200,
        }
        break
      case '50':
        queryObject.$and = [
          {
            price: {
              $gt: 0,
            },
          },
          {
            price: {
              $lte: 50,
            },
          },
        ]
        break
      case '100':
        queryObject.$and = [
          {
            price: {
              $gt: 50,
            },
          },
          {
            price: {
              $lte: 100,
            },
          },
        ]
        break
      case '150':
        queryObject.$and = [
          {
            price: {
              $gt: 100,
            },
          },
          {
            price: {
              $lte: 150,
            },
          },
        ]
        break
      case '200':
        queryObject.$and = [
          {
            price: {
              $gt: 150,
            },
          },
          {
            price: {
              $lte: 200,
            },
          },
        ]
        break
      default:
        break
    }

    if (q) {
      queryObject.$or = [
        {
          title: {
            $regex: q,
          },
        },
        {
          summary: {
            $regex: q,
          },
        },
        {
          description: {
            $regex: q,
          },
        },
      ]
    }

    return queryObject
  },
}
