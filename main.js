// console.log('check')

// const elements

const container = document.querySelector(".container");
// control check for the html element
// console.log(container)
const infoText = document.querySelector(".infoText");

const movieList = document.querySelector("#movie");
// console.log(movieList)
const seatCount = document.getElementsByClassName("count");
const totalAmount = document.getElementById("amount");
const seats = document.querySelectorAll(".seat:not(.reserved)");
// console.log(seats)

const saveToDatabase = (index) => {
  // console.log('data',index)

  localStorage.setItem("seatsIndex", JSON.stringify(index));

  // film data save
  localStorage.setItem('movieIndex' ,JSON.stringify(movieList.selectedIndex));
};


const getFromDatabase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
  // console.log(dbSelectedSeats)
  if (dbSelectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }
  const dbSelectedMovie=JSON.parse(localStorage.getItem("movieIndex"))
  movieList.selectedIndex=dbSelectedMovie

};
getFromDatabase();

const createIndex = () => {
  let allSeatsArray = [];
  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });
  const allSelectedSeastsArray = [];

  const allSelectedSeasts = container.querySelectorAll(".seat.selected");

  allSelectedSeasts.forEach((selectedSeat) => {
    allSelectedSeastsArray.push(selectedSeat);
  });
  // console.log(allSelectedSeastsArray)
  const selectedSeatsIndex = allSelectedSeastsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  // console.log(selectedSeatsIndex)

  saveToDatabase(selectedSeatsIndex);
};
const calculateTotal = () => {
  // console.log("calculate working")
  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //   console.log(selectedSeatsCount);
  count.innerText = selectedSeatsCount;

  totalAmount.innerText = selectedSeatsCount * movieList.value;

  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
  createIndex();
};
calculateTotal();
container.addEventListener("click", (pointerEvent) => {
  // console.log('container click check')
  // console.log(e)
  const clickedSeat = pointerEvent.target.offsetParent;
  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
    calculateTotal();
  }
});
movieList.addEventListener("change", () => {
  calculateTotal();
});
