let filter = document.getElementById('filterinput');

// Add Event Listener
filter.addEventListener('keyup', filterName);

function filterName() {
  let filterValue = filter.value.toUpperCase();

  let ul = document.getElementById('names');
  let li = ul.querySelectorAll('li.collection-ite1m');

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName('a')[0];
    if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}
