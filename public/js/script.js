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


// document.querySelector('.edit-comment-btn').addEventListener('click', () => {
//   document.querySelector('.editForm').classList.add('visible')
// })

// let editFormBtn = document.querySelector('li:nth-child(10) a')

// console.log(editFormBtn)
// editFormbtn.addEventListener('click', () => {
//   document.querySelector('.editForm').classList.add('visible')
// })

document.querySelectorAll('.edit-comment-btn').forEach((element) => {
  element.addEventListener('click', () => {
    element.parentElement.querySelector('.editForm').classList.add('visible')
  })
})


// document.querySelectorAll('.hide-edit-form').forEach(element => {
//   element.addEventListener('click', envet => {
//     element.parentElement.querySelector('.editForm').classList.remove('visible')
//   })
// })


document.querySelector('.hide-edit-form').forEach((element) => {
  element.addEventListener('click', () => {
    element.querySelector('.editForm').classList.remove('visible')
  })
})