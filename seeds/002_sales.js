exports.seed = function(knex, Promise) {
    return knex("sales")
      .truncate()
      .then(function() {
        return knex("sales").insert([
          {
            carId: 2,
            sold: true,
            customerName: "J.D. Witherspoon",
            bookPrice: 1500,
            askingPrice: 1100,
            sellingPrice: 900
          },
          {
            carId: 3,
            sold: false,
            bookPrice: 1000,
            askingPrice: 850
          }
        ]);
      });
  };
  