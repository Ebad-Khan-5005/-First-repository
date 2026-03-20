

const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// ACCESSING THINGS::
const dropdowns = document.querySelectorAll(".dropdown select");
const btns = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// CHANGING COUNTRIES::
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (eve) => {
        updateFlage(eve.target);
    });
}
// CHANGING COUNTRIES FLAGS::
const updateFlage = (element) => {
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
// BUTTON WORKS ::
btns.addEventListener("click", async (evt) => {
 evt.preventDefault();
 let amount = document.querySelector(".amount input");
 let amtVAL = amount.value;
 console.log(amtVAL);
 if(amtVAL === "" || amtVAL < 1 ){
    amtVAL=1;
    amount.value="1";
    alert("you cannot give negitive number nor letters nor can leave it empty!");}


// CURRENCY EXCHANGE::
    const URL1 = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    
    let response1 = await fetch(URL1);
    let data1 = await response1.json();
    let rate = data1[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = (amtVAL * rate).toFixed(2);

    msg.innerText = `${amtVAL} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    
   


});
