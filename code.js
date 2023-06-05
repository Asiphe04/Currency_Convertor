// const pounds = document.getElementById("pounds");
// const rands = document.getElementById("rands");
// const euros = document.getElementById("euros");
// const dollars = document.getElementById("dollars");

// function computeConvert(event) {
//   const currentValue = +event.target.value;

//   switch (event.target.name) {
//     case "pounds":
//       const poundToRands = 24.1;
//       const poundToEuros = 1.16;
//       const poundToDollars = 1.24;
//       rands.value = (currentValue * poundToRands).toFixed(2);
//       euros.value = (currentValue * poundToEuros).toFixed(2);
//       dollars.value = (currentValue * poundToDollars).toFixed(2);
//       break;
//     case "rands":
//       const randsToPounds = 0.042;
//       const randsToEuros = 0.048;
//       const randsToDollars = 0.051;

//       pounds.value = (currentValue * randsToPounds).toFixed(2);
//       euros.value = (currentValue * randsToEuros).toFixed(2);
//       dollars.value = (currentValue * randsToDollars).toFixed(2);
//       break;
//     case "euros":
//       const eurosToPounds = 0.86;
//       const eurosToRands = 20.78;
//       const eurosToDollars = 1.07;

//       pounds.value = (currentValue * randsToPounds).toFixed(2);
//       rands.value = (currentValue * randsToRands).toFixed(2);
//       dollars.value = (currentValue * randsToDollars).toFixed(2);
//       break;
//     case "dollars":
//       const dollarsToPounds = 0.81;
//       const dollarsToRands = 19.43;
//       const dollarsToEuros = 0.94;

//       pounds.value = (currentValue * dollarsToPounds).toFixed(2);
//       rands.value = (currentValue * dollarsToRands).toFixed(2);
//       euros.value = (currentValue * dollarsToEuros).toFixed(2);
//     default:
//       break;
//   }
// }

//    API
const apiKey = "16d37f5d29bd96612f287312";
// fetch currency options

fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
  .then((response) => response.json())
  .then((data) => {
    const { supported_codes } = data;
    const selectElements = document.querySelectorAll("select");

    supported_codes.forEach((code) => {
      const optionElement = document.createElement("option");
      optionElement.value = code;
      optionElement.text = code;

      selectElements.forEach((select) => {
        select.appendChild(optionElement.cloneNode(true));
      });
    });
  })
  .catch((error) => {
    console.log("Error fetching currency options:", error);
  });

function convertCurrency() {
  const amountInput = document.getElementById("amountInput");
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;
  const resultElement = document.getElementById("result");

  fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`
  )
    .then((response) => response.json())
    .then((data) => {
      const { conversion_rate } = data;
      const convertedAmount = (amountInput.value * conversion_rate).toFixed(2);

      resultElement.innerHTML = `${amountInput.value} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    })

    .catch((error) => {
      console.log("Error fetching exchange rate:", error);
    });
}

const convertBtn = document.getElementById("convertBtn");
convertBtn.addEventListener("click", convertCurrency);
