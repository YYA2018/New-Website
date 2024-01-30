"use strict";
const generalBtn = document.querySelector(".gen-btn");
const entertainBtn = document.querySelector(".ent-btn");
const healthBtn = document.querySelector(".health-btn");
const sciBtn = document.querySelector(".sci-btn");
const spoBtn = document.querySelector(".spo-btn");
const techBtn = document.querySelector(".tech-btn");
const navBtns = document.querySelectorAll(".btn");

const genralCont = document.querySelector(".container");
let grid;

const getNews = async function (type) {
  let resp = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${type}&country=us&apiKey=7622e8da91554ce99c98290db305d503`
  );
  let data = await resp.json();
  let articlesArr = data.articles;

  let topicImg, topicDesc;

  articlesArr.forEach((artObj) => {
    let i = articlesArr.indexOf(artObj);
    articlesArr[i].urlToImage == null
      ? (topicImg = "news.jpg")
      : (topicImg = articlesArr[i].urlToImage);

    articlesArr[i].description == null
      ? (topicDesc = "Click on read more to know about the topic!")
      : (topicDesc = articlesArr[i].description);

    grid = `
        <div class="topic-cont">
          <img class="topic-img" src="${topicImg}" alt="descriptive photo" />
          <h3 class="topic-title">${articlesArr[i].title}</h3>
          <div class="topic-brief">${topicDesc}</div>
          <a target="_blank" href="${articlesArr[i].url}"> 
            <button class="read-more-btn">Read More</button>    
          </a>
        </div>`;
    genralCont.insertAdjacentHTML("beforeend", grid);
  });
};

getNews("general");

navBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (genralCont.hasChildNodes()) {
      console.log("yes!");
      genralCont.innerHTML = "";
    }
    console.log(genralCont);
    let selectedCat = btn.classList[2];
    console.log(selectedCat);
    getNews(selectedCat);
  });
});
