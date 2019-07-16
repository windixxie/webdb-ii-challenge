exports.up = function(knex) {
    return knex.schema.createTable("sales", tbl => {
      tbl.increments();
      tbl
        .integer("carId")
        .unsigned()
        .references("id")
        .inTable("cars")
        .notNullable(); // Possibly should add a unique constraint to prevent multiple entries for the same car, but perhaps a dealer would buy a car back and relist it, but wish to keep the original listing on file
      tbl.boolean("sold").notNullable();
      tbl.string("customerName"); // We should have another table for customers instead and use another foreign key, but this will suffice for now
      tbl.decimal("bookPrice");
      tbl.decimal("askingPrice");
      tbl.decimal("sellingPrice");
      tbl
        .datetime("createdAt")
        .notNullable()
        .defaultTo(knex.fn.now());
      tbl
        .datetime("updatedAt")
        .notNullable()
        .defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("sales");
  };
  