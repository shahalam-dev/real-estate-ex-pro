const fromAuth = require("./auth.controllers");
const fromProfile = require("./profile.controllers");
const fromMeals = require("./user_meals.controllers");
const fromFoods = require("./food.controllers");
const fromUserdata = require("./userdata.controllers");
const fromWater = require("./track_water.controller");
const fromExercise = require("./exercise.controllers");
const fromMood = require("./moods.controller");
const fromRecipe = require("./recipe.controllers");
const fromGoal = require("./goal.controllers");
const fromChallenge = require("./challenge.controllers");

const controllers = {
  auth: { ...fromAuth },
  profile: { ...fromProfile },
  meals: { ...fromMeals },
  foods: { ...fromFoods },
  userdata: { ...fromUserdata },
  water: { ...fromWater },
  exercise: { ...fromExercise },
  mood: { ...fromMood },
  recipe: { ...fromRecipe },
  goal: { ...fromGoal },
  challenge: { ...fromChallenge },
};

module.exports = controllers;
