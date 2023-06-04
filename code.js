const pounds = document.getElementById("pounds");
const rands = document.getElementById("rands");

function computeTemp(event) {
  const currentValue = +event.target.value;

  switch (event.target.name) {
    case "pounds":
      rands.value = (currentValue * 1.8 + 32).toFixed(2);
      break;
    case "rands":
      pounds.value = ((currentValue - 32) / 1.8).toFixed(2);
      break;
    default:
      break;
    
  }
}
