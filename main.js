//fetch players
var playerNum = 1;
const playerApi = `http://localhost:3000/players/`;
function getPlayers(cb, num) {
  fetch(`${playerApi}${num}`)
    .then((res) => {
      return res.json();
    })
    .then(cb)
    .then(() => {
      viewPlayer();
    });
}
function renderPlayers(player) {
  var mainBlock = document.getElementById("main");
  var htmls = `<div>
    <div class="tabs">
          <div class="tab-item active">
            <i class="tab-icon fas fa-user"></i>
            Player
          </div>
          <div class="tab-item">
            <i class="tab-icon fas fa-futbol"></i>
            Goals
          </div>
          <div class="tab-item">
            <i class="tab-icon fas fa-handshake"></i>
            Assists
          </div>
          <div class="tab-item">
            <i class="tab-icon fas fa-trophy"></i>
            Titles
          </div>
          <div class="line"></div>
        </div>
        
        <div class="tab-content">
        <div class="tab-pane active">
          <h2>#${player.id} ${player.name}</h2>
          <p style="text-align: justify">${player.summary}</p>
        </div>
        <div class="tab-pane">
          <p style="font-size: 24px; min-height: 120px; display: flex; justify-content: center; align-items: center; ">${player.goals}</p>
        </div>
        <div class="tab-pane">
          <p style="font-size: 24px; min-height: 120px; display: flex; justify-content: center; align-items: center; ">${player.assists}</p>
        </div>
        <div class="tab-pane">
          <p style="font-size: 24px; min-height: 120px; display: flex; justify-content: center; align-items: center; ">${player.titles}</p>
        </div>
      </div>
      </div>
      <div class="dark-btn">Dark Mode 🌙</div>`;

  mainBlock.innerHTML = htmls;
}

function viewPlayer() {
  //ngan gon
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  //array
  const tabs = $$(".tab-item");
  const tabsPanes = $$(".tab-pane");
  const ranks = $$(".list-item");

  //tab active mac dinh
  const tabActive = $(".tab-item.active");
  //line truot mau xanh
  const line = $(".line");

  // nut dark mode
  const darkBtn = $(".dark-btn");
  darkBtn.onclick = function darkMode() {
    darkBtn.classList.toggle("active");
    $("body").classList.toggle("black-bg");
    if (darkBtn.innerHTML == "Light Mode ☀️") {
      darkBtn.innerHTML = "Dark Mode 🌙";
    } else {
      darkBtn.innerHTML = "Light Mode ☀️";
    }
    tabs.forEach((tab, index) => {
      const pane = tabsPanes[index];
      tab.classList.toggle("black-bg");
      pane.classList.toggle("white-text");
    });
  };

  function setLine(tab) {
    line.style.left = `${tab.offsetLeft}px`; //set line mac dinh
    line.style.width = `${tab.offsetWidth}px`;
  }
  setLine(tabActive);

  tabs.forEach((tab, index) => {
    const pane = tabsPanes[index];
    tab.onclick = () => {
      $(".tab-item.active").classList.remove("active");
      $(".tab-pane.active").classList.remove("active");
      tab.classList.add("active");
      pane.classList.add("active");
      setLine(tab);
    };
  });

  ranks.forEach((rank, index) => {
    rank.onclick = () => {
      $(".list-item.list-item-active").classList.remove("list-item-active");
      rank.classList.add("list-item-active");
      playerNum = index + 1;
      getPlayers(renderPlayers, playerNum);
    };
  });
}

function start() {
  getPlayers(renderPlayers, 1);
}
start();
