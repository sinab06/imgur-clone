const container = document.getElementById("container");
let limit = 25;
let pageCount = 1;
let postCount = 1;
var stop;
const getPost = async () => {
  let res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}$_page=${pageCount}`
  );
  let data = await res.json();
  let end = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  let s = await end.json();
  stop = s.length;
  console.log(stop);
  data.map((currElm, i) => {
    const htmlData = `
        <div class="posts">
            <p class="post-id">${pageCount++}</p>
            <h2 class="title">${currElm.title}</h2>
            <p class="post-info">${currElm.body}</p>
        </div>`;
    container.insertAdjacentHTML("beforeend", htmlData);
  });
};
getPost();
const showData = async () => {
  setTimeout(() => {
    pageCount++;
    getPost();
  }, 300);
};
window.addEventListener("scroll", () => {
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  console.log(pageCount, stop);
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log("I'm bottom");
    showData();
  }
});


window.onscroll = function () {
    myFunction();
  };
  
  var navbar = document.getElementById("navbar");
  
  var sticky = navbar.offsetTop;
  
  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }
  
  async function Image() {
    let res = await fetch(
      "https://pixabay.com/api/?key=25452167-3cc9b967cae49049698b7572e&q=yellow+flowers&image_type=photo&per_page=200"
    );
    let data = await res.json();
    console.log(data);
    showImage(data.hits);
  }
  Image();
  
  function showImage(data) {
    let addImage = document.getElementById("addImage");
    addImage.innerHTML = null;
    data.forEach(function (el) {
      let div = document.createElement("div");
      // userImageURL
      let img = document.createElement("img");
      img.src = el.userImageURL;
  
      let tag = document.createElement("p");
      tag.innerText = el.tags;
      div.append(img, tag);
      addImage.append(div);
    });
  }
  
  //debouncing
  
  async function searchImg() {
    let query = document.getElementById("query").value;
    console.log("qu", query);
    let res = await fetch(
      `https://pixabay.com/api/?key=25452167-3cc9b967cae49049698b7572e&q=${query}&image_type=photo&per_page=50`
    );
  
    let data = await res.json();
    console.log("data:", data);
    showImage(data.hits);
  }