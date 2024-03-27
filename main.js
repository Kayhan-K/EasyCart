import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const cartBtn = document.getElementById("cartBtn");
const userInput = document.getElementById("userInput");
const cartItems = document.getElementById("cart-items");

const firebaseSettings = {
  databaseURL:
    "https://easycart-4f274-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, "items");

cartBtn.addEventListener("click", () => {
  let cartItem = userInput.value;
  let items = [];
  items.push(cartItem);

  push(itemsInDB, cartItem);
  userInput.value = "";

  const listItemHTML = items.map((item) => `<li>${item}<li/>`);
  cartItems.innerHTML += listItemHTML;
});
