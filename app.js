//? MAIN.JS
console.log("***** main *****");

const tBody = document.querySelector("tBody");
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("searchInput");
const modalContent = document.querySelector(".modal-content");
const modalDialog = document.querySelector(".modal-dialog");
// const newSaveBtn = document.getElementById("saveBtn");


// Yeni Save button'u oluştur ve olay dinleyicisini ekle
const newSaveBtn = document.createElement("button");
newSaveBtn.id = "saveBtn";
newSaveBtn.className = "btn btn-primary";
newSaveBtn.innerText = "Save";

// Yeni Save button'u oluşturan fonksiyon
function createSaveButton() {
  // Footer'a ekle
  const modalFooter = document.querySelector(".modal-footer");
  modalFooter.appendChild(newSaveBtn);
  modalDialog.appendChild(modalContent);
}




// https://api.coinranking.com/v2/search-suggestions?query=avax

let getCoins = []

const getCripto = async () => {
  try {
    const response = await fetch(`https://api.coinranking.com/v2/coins`);
    if (!response.ok) {
      throw new Error(`Sth went wrong: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.data.coins);

    showCoins(data.data.coins);
    getCoins = data.data.coins;
 
  } catch (error) {
    if (error.status === 429) {
      console.log("Too Many Requests. Waiting for a while...");
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } // 5 saniye bekleyin (örnek)
    console.log(error);
  }
};

const delayBetweenRequests = 1000;
const handleApiRequests = async () => {
  for (let i = 0; i < 3; i++) {
    await getCripto();
    await new Promise((resolve) => setTimeout(resolve, delayBetweenRequests));
  }
};

function showCoins(data) {
  data.forEach((element) => {
    const { symbol, name, color, coinrankingUrl, iconUrl, rank, change } =
      element;
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td class="fw-bold">${name} </td>
            <td "text-center">${rank} </td>
            <td style=""text-center" color:${color}; font-weight:800">${symbol} </td>
            <td "text-center">
                <img src="${iconUrl}" alt="${name} Icon" width="30px" />
            </td>
            <td "text-center">${change} </td>
            <td class="text-center">
                    <a href="${coinrankingUrl}" target="_blank">
                        <i class="fa-solid fa-chart-line" style="color: #4d8f5a;">
                 
                        </i>
                     </a> 
            </td>
        `;
    tBody.appendChild(tr);
  });
}
let setLocalCoins =[]
handleApiRequests();

const showModal = (coins) => {
  coins.forEach((element) => {
    const { symbol, name, color, coinrankingUrl, iconUrl, rank, change } =
      element;
        
    if (name === searchInput.value) {
        setLocalCoins.push(element)
        localStorage.setItem("coins",JSON.stringify(setLocalCoins))
      modalContent.innerHTML = `
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="staticBackdropLabel">${name}</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                        <table>
                                        <tr><td>${rank} </td></tr>
                                        <tr><td style="color:${color}; font-weight:800">${symbol} </td></tr>
                                        <tr><td>
                                            <img src="${iconUrl}" alt="${name} Icon" width="30px" />
                                        </td></tr>
                                        <tr><td>${change} </td></tr>
                                        <tr><td>
                                                <a href="${coinrankingUrl}" target="_blank">
                                                    <i class="fa-solid fa-chart-line" style="color: #4d8f5a;">
                                            
                                                    </i>
                                                </a> 
                                        </td></tr>
                                        <table>
                            </div>
                            <div class="modal-footer">
                            </div>
                            `;
                         // Yeni Save button'u oluştur ve olay dinleyicisini ekle

                            const modalFooter = document.querySelector(".modal-footer");
                            modalFooter.appendChild(newSaveBtn);
                            modalDialog.appendChild(modalContent);
                        
    }
  });
};


searchBtn.addEventListener("click", () => {
    showModal(getCoins);
  });


  newSaveBtn.addEventListener("click", () =>{
    console.log("Save button is clicked");
    let localCoins = localStorage.getItem("coins");
  
    if (localCoins) {
      try {
        const parsedCoins = JSON.parse(localCoins);
        console.log("Parsed LocalCoins:", parsedCoins);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    } else {
      console.log("No 'coins' key found in localStorage");
    }
})

createSaveButton();