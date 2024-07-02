//! Get Elements
let draggable_list = document.querySelector("#draggable_list")
let check = document.querySelector("#check")
// Sort Elements
const toplargestStars = [
  "UY Scuti",
  "WOH G64",
  "WOH 5170",
  "RSGC1-F01",
  "HD 269551"
];
let listItems = [];
let dragStartIndex;
insertElements();
//! Insert List Items Into DOM
function insertElements() {
  [...toplargestStars].map(a => ({ value: a, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(a => a.value).forEach((star, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
    <p class="star-name">${star}</p>
    <i class="fas fa-grip-horizontal icon"></i>
    </div>
    `
    listItem.setAttribute("data-index", index)
    listItems.push(listItem)
    draggable_list.appendChild(listItem)
  }
  )
  addEventListeners()
}
//! Drag and Drop Functions
function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute("data-index")
}
function dragOver(prevent) {
  prevent.preventDefault()
}
function dragLeave() {
  this.classList.remove(`over`)
}
function dragEnter() {
  this.classList.add(`over`)
}
function dragDrop() {
  this.classList.remove(`over`)
  const dragEndIndex = +this.closest('li').getAttribute("data-index");
  swap(dragStartIndex, dragEndIndex)
}
function swap(fromIndex, toIndex) {
  let itemOne = listItems[fromIndex].querySelector(".draggable");
  let itemTwo = listItems[toIndex].querySelector(".draggable");
  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}
//! Adding Events TO Items
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable_list li");
  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart);
  })
  dragListItems.forEach(item => {
    item.addEventListener("dragenter", dragEnter)
    item.addEventListener("dragleave", dragLeave)
    item.addEventListener("dragover", dragOver)
    item.addEventListener("drop", dragDrop)
  })
}
//! Check Order
check.addEventListener('click', checkOrder)
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const starName = listItem.querySelector('.star-name').innerText.trim();
    if (starName !== toplargestStars[index]) {
      listItem.classList.add('wrong')
    } else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}