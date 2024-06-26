import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

const cartBtn = document.getElementById("cartBtn");
const userInput = document.getElementById("userInput");
const cartItems = document.getElementById("cart-items");

const firebaseSettings = {
  databaseURL:
    "https://easycart-4f274-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseSettings);
const database = getDatabase(app);
const cartInDb = ref(database, "Cart");

userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    cartBtn.click();
  }
});

cartBtn.addEventListener("click", () => {
  let cartItem = userInput.value;

  push(cartInDb, cartItem);

  clearInput();
});

onValue(cartInDb, function (snapshot) {
  if (snapshot.exists()) {
    let cartArray = Object.entries(snapshot.val());
    clearList();
    clearInput();
    displayItem(cartArray);
  } else {
    console.log("Sorry no items in database...");
    cartItems.innerHTML = "";
  }
});
//snapshot exists allows you to edit last item in database for it to be removed.
//extract and display items function, use object to convert to array.
//reading the data from the database, it is recieved as a snapshot - extracted by the val() method.

function clearInput() {
  userInput.value = "";
}

function clearList() {
  cartItems.innerHTML = "";
}

function displayItem(items) {
  items.map((item) => {
    let currentItemValue = item[1];
    let currentItemID = item[0];
    const listItem = document.createElement("li");
    listItem.innerText = currentItemValue;
    listItemStyling(listItem);
    listItem.addEventListener("dblclick", function () {
      const locationReferenceItem = ref(database, `Cart/${currentItemID}`);

      remove(locationReferenceItem);
    });

    cartItems.appendChild(listItem);
  });
}

function listItemStyling(listItem) {
  listItem.style.backgroundColor = "#F5F5F5";
  listItem.style.borderRadius = "0.25rem";
  listItem.style.padding = "0.5rem";
  listItem.style.flexGrow = "1";
  listItem.style.cursor = "pointer";
  listItem.style.fontFamily = "'Courier New', monospace";
  listItem.addEventListener("mouseenter", function () {
    this.style.backgroundColor = "#F87171";
  });
  listItem.addEventListener("mouseleave", function () {
    this.style.backgroundColor = "#F5F5F5";
  });
}
