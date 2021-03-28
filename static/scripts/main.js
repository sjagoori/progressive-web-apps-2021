console.log('main running');
// Set bookmark as an empty template array 
if (localStorage.getItem('bookmarks') == null) localStorage.setItem('bookmarks', JSON.stringify([]))

// Set bookmarks as global variable
let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

window.location.pathname != '/' ? renderBookmarksButtons() : renderBookmarks()

/**
 * Function renders forms to list items and adds evenlisteneres.
 */
function renderBookmarksButtons(){
  for (let index = 0; index < document.getElementsByTagName('li').length; index++) {

    const listItem = document.getElementsByTagName('li')[index];

    const form = document.createElement('form');
    form.setAttribute('action', 'bookmark')
    form.addEventListener('submit', handleSave)

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('class', 'save')
    submitButton.textContent = 'Save'

    Object.values(bookmarks).find(key => key.title === listItem.children[0].innerText) != undefined ? (
      submitButton.setAttribute('disabled', ''),
      submitButton.textContent = 'Saved'
    ) : false

    form.appendChild(submitButton)
    listItem.appendChild(form)
  }
}

/**
 * Function renders bookmark section in the body
 */
function renderBookmarks(){
  let list = document.createElement('ul');
  let header = document.createElement('h2');
  header.textContent = 'Bookmarks'
  list.appendChild(header)

  for (let index = 0; index < bookmarks.length; index++) {
    let listItem = document.createElement('li')
    let a = document.createElement('a')
    a.href = bookmarks[index].link
    a.textContent = bookmarks[index].title
    let image = document.createElement('img')
    image.src = bookmarks[index].imageSrc ? bookmarks[index].imageSrc : null
    image.alt = bookmarks[index].title

    let form = document.createElement('form')
    form.action = '/deleteItem'
    form.method = 'post'
    form.addEventListener('submit', handleDelete)

    let submitButton = document.createElement('button')
    submitButton.textContent = 'Remove'
    submitButton.type = 'submit'
    submitButton.setAttribute('class', 'disabled')
    form.appendChild(submitButton)

    listItem.appendChild(a)
    bookmarks[index].imageSrc ? listItem.appendChild(image) : null
    listItem.appendChild(form)
    list.appendChild(listItem)
  }
  if (JSON.parse(localStorage.getItem('bookmarks')).length > 0) document.body.appendChild(list)
}

/**
 * Function removes list item from bookmarks, then updates the DOM
 * @param {Event} e event
 */
function handleDelete(e) {
  e.preventDefault();
  let title = e.target.parentNode.children[0].innerText

  let local = JSON.parse(localStorage.getItem('bookmarks'))

  let renew = local.map(key => key.title != title ? key : false).filter(elem => typeof elem == 'object')

  local.length < 2 ? e.target.parentNode.parentNode.remove() : e.target.parentNode.remove()

  localStorage.setItem('bookmarks', JSON.stringify(renew))
}

/**
 * Function saves list item in bookmarks, then updates the DOM
 * @param {Event} e event
 */
function handleSave(e) {
  e.preventDefault();
  e.target.firstChild.textContent = 'Saved'
  e.target.firstChild.setAttribute('disabled', '');

  let local = JSON.parse(localStorage.getItem('bookmarks'))
  console.log(typeof local, local);

  let newField = {
    title: e.target.parentNode.children[0].innerText,
    link: e.target.parentNode.children[0].href,
    imageSrc: e.target.parentNode.children[1].children[0].src
  }

  local.push(newField)

  localStorage.setItem('bookmarks', JSON.stringify(local))
}