const btn = document.querySelector(".btn");
const h1 = document.querySelector("h1");
const output = document.querySelector(".output");
const inputVal = document.querySelector(".val");
const page = { json: {}, page: 1, per: 10, arr: [] };

// New URL
// const baseurl = "https://restcountries.com/v3.1/";
// Old URL
const baseurl = "https://restcountries.com/v2/";

btn.textContent = "Search by Name";
h1.textContent = "Search Country Info";
inputVal.value = "united";

btn.addEventListener("click", (e) => {
  console.log("ready");
  const para = "name/" + inputVal.value;
  const url = baseurl + para;
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      loadPages(data);
    });
});

// Load pages and pass in the data object into pages and then within console will output
function loadPages(data) {
  output.innerHTML = "";
  console.log(data);
  data.forEach((el) => {
    pageEl(el);
  });
}

// Output and create every country
function pageEl(data) {
  console.log(data);
  const main = createNode(output, "div", "");
  main.classList.add("box");
  main.addEventListener("click", (e) => {
    makeaPage(data);
  });

  const title = createNode(main, "div", `<h2>${data.name}</h2>`);
  title.style.color = "red";

  const title2 = createNode(main, "div", `${data.nativeName}`);

  createNode(main, "div", `${data.subregion}`);

  const flag = createNode(main, "img", "");
  flag.setAttribute("src", data.flags.svg);

  let html1 = `<div>Population : ${data.population}</div>`;
  html1 += `${
    data.currencies
      ? `<div>Currency : ${data.currencies[0].name} ${data.currencies[0].symbol}</div>`
      : ""
  }`;

  const stats = createNode(main, "div", html1);
}
// Function for create list of nodes
function createNode(parent, elType, html) {
  const ele = document.createElement(elType);
  parent.append(ele);
  ele.innerHTML = html;
  return ele;
}
