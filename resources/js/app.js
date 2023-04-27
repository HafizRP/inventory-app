import '../css/app.css'


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

const searchBar = document.getElementById('searchbar-input')
const searchResult = document.querySelector('.search-result')

searchBar.addEventListener('input', async (v) => {
  if (v.target.value) {
    searchResult.classList.remove('d-none')
    const input = v.target.value.toLowerCase()
    const response = await fetch('products')
    const products = await response.json()
    const searchResults = document.querySelectorAll('.list-group-item')
    const product = products.filter(({ product_name }) => product_name.toLowerCase().indexOf(input) > -1)


    searchResults.forEach((li, i) => {
      console.log(product)
      if (i >= product.length) {
        li.classList.add('d-none')
      } else {
        li.classList.add('d-block')
        li.classList.remove('d-none')
        li.href = `/product?q=${product[i].product_name}`
        li.innerHTML = '<i class="bi bi-search px-2"></i>' + product[i].product_name
        // li.innerText = product[i].product_name
      }

    })
  } else {
    searchResult.classList.add('d-none')
  }
})
