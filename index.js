const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create({
      title: "Pommes au four qu'elles sont pas mal",
      level: "Easy Peasy",
      ingredients: ["pommes", "four"],
      cuisine: "bryan",
      dishType: "main_course",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXsWI0TB9AHIUIcDFBUoVf71Sd4eaZV4rbsA&usqp=CAU",
      duration: 7,
      creator: "Bryan Tsanga",
      created: 06061923,
    });
  })
  .then(async () => {
    await Recipe.insertMany(data);
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    await Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
