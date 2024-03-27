import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, orderByKey } from "firebase/database";

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
const cartInDb = ref(database, "Cart");

cartBtn.addEventListener("click", () => {
  let cartItem = userInput.value;
  let items = [];
  items.push(cartItem);

  push(itemsInDB, cartItem);

  clearInput();

  displayNote(items);
});

onValue(cartInDb, function (snapshot) {
  let cartArray = Object.values(snapshot.val());

  clearInput();
  displayNote(cartArray);
});

function clearInput() {
  userInput.value = "";
  cartItems.innerHTML = "";
}

function displayNote(items) {
  items.map((item) => {
    const listItem = document.createElement("li");
    listItem.innerText = item;
    cartItems.appendChild(listItem);
  });
}
