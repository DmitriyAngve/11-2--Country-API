const btn = document.querySelector(".btn");
const h1 = document.querySelector("h1");
const output = document.querySelector(".output");
const inputVal = document.querySelector(".val");

// Object that we can group to different pages. Within this object, this can just be JSON and an object sitting with an object
const page = { json: {}, page: 1, per: 10, arr: [] };

// New URL
// const baseurl = "https://restcountries.com/v3.1/";
// Old URL
const baseurl = "https://restcountries.com/v2/";

btn.textContent = "Load Pages";
inputVal.style.display = "none";
h1.textContent = "Load Country Info";

btn.addEventListener("click", (e) => {
  console.log("ready");
  const para = "all";
  const url = baseurl + para;
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      createPages(data);
    });
});

// Dynamically create pages. Split by 10 countries per page
function createPages(data) {
  page.arr.length = 0; // clear out the contents of an array
  //   let tempArr = [];
  //   let ptotal = data.length / page.per; // how many pages
  //   console.log(ptotal);
  for (let i = 0; i < data.length; i += page.per) {
    let tempArr = data.slice(i, i + page.per);
    //console.log(tempArr);
    page.arr.push(tempArr);
  }
  loadPages();
}

function loadPagination() {
  const main = createNode(output, "div", "");
  for (let i = 0; i < page.arr.length; i++) {
    const pg = createNode(main, "div", i + 1);
    pg.classList.add("pgs");
    if (page.page == i + 1) {
      pg.style.backgroundColor = "red";
    }
    pg.addEventListener("click", (e) => {
      console.log(i + 1);
      page.page = i + 1;
      loadPages();
    });
  }
}

// Load pages and pass in the data object into pages and then within console will output
function loadPages() {
  output.innerHTML = "";
  console.log(page.arr, page.page);
  page.arr[page.page - 1].forEach((el) => {
    pageEl(el);
  });
  loadPagination();
}

// Output and create every country
function pageEl(data) {
  console.log(data);
  const main = createNode(output, "div", "");
  main.classList.add("box");

  const title = createNode(main, "div", `<h2>${data.name}</h2>`);
  title.style.color = "red";

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
