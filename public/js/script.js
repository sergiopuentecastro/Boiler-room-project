document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("second-project JS imported successfully!");
  },
  false
);

document.querySelector('#commnet-btn').addEventListener('click', () => {
  document.querySelector('#comment').classList.add('visible')
})

document.querySelector('.hideForm').addEventListener('click', event => {
  event.preventDefault()
  document.querySelector('#comment').classList.remove('visible')
})



document.querySelectorAll('.edit-comment-btn').forEach((element) => {
  element.addEventListener('click', () => {
    element.parentElement.querySelector('.editForm').classList.add('visible')
  })
})


document.querySelector('.hide-edit-form').forEach((element) => {
  element.addEventListener('click', () => {
    element.querySelector('.editForm').classList.remove('visible')
  })
})