exports.seed = function(knex, Promise) {
    return knex("cars")
      .truncate()
      .then(function() {
        return knex("cars").insert([
          {
            vin: "JF2AC53B3GE202643",
            make: "Subaru",
            model: "GL",
            mileage: 235196,
            transmission: "manual",
            title: "salvage"
          },
          {
            vin: "3B7HF13Z11M269883",
            make: "Dodge",
            model: "Ram",
            mileage: 201367,
            transmission: "automatic",
            title: "clear"
          }
        ]);
      });
  };
  