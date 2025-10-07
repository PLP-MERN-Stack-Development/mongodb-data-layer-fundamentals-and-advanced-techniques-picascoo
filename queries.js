//===== BASIC CRUD OPERATIONS =====//

// Find all books in a specific genre 
db.books.find({ genre: "Fiction" });

//Find books published after a certain year
db.books.find({published_year: {$gt: 2010}});

// Find books by a specific author
db.books.find({author: "Harper Lee"});

// Update the price of a specific book
db.books.updateOne(
  { title: "The Lord of the Rings" },
  { $set: { price: 10.99 } }
);

// Delete a book by title
db.books.deleteOne({ title: "Moby Dick" });

//===== ADVANCED QUERIES =====//
 // Find vooks that are in stock and published after 2010
 db.books.find({in_stock: true, published_year: {$gt:2010}});

 //Projection(show only title, author, and price)
 db.books.find({}, {title:1, author:1, price: 1, _id: 0});

 //Sort price by ascending order
 db.books.find(). sort ({price :1});

 //Sort price by descending order
db.books.find(). sort ({price : -1});


//pagination
db.books.find().skip (0). limit (5); //first 5 results
db.books.find().skip (5). limit (5); //next 5 results


// ===== AGGREGATION PIPELINE =====//
// Calculate the average price of books by genre

db.books.aggregate([
    {$group: {id: "$genre", averagePrice:
        {$avg: "$price"}}}
]);

// Author with the most books
db.books.aggregate([
    {$group: {_id: "$author", bookCount: {$sum: 1}}},
    {$sort: {bookCount: -1}},
    {$limit: 1}
]);
// Books grouped by publication decade
db.books.aggregate ([
    {
        $group:{
            _id: {$floor: {$divide:["$published_tear", 10] } },
       count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] },
      count: 1,
      _id: 0
    }
  }
]);


//===INDEXING====
// Create index on title
db.books.createIndex({ title: 1 });

// Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Explain performance
db.books.find({ title: "The Alchemist" }).explain("executionStats");