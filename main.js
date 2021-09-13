const tagAreaEl = document.querySelector('#tag-area');
const selectSection = document.createElement('select');
selectSection.id = 'selection';
selectSection.className = 'text-input';
tagAreaEl.appendChild(selectSection);
const button = document.querySelector('#save-data');
//GET THE JSON
async function fetchData(filteredChar) {
  try {
    const key = 'api_key=1bbe5e8200e247b02e555f96904c5de3';
    const url = `https://api.themoviedb.org/3`;
    const api = url + '/genre/movie/list?' + key;
    const response = await fetch(api);
    if (response.status >= 200 && response.status < 400) {
      const data = await response.json();
      const modifyData = data.genres.map((data) => {
        if (data.name === 'Action') {
          data.name = 'None';
        }
        if (data.name === 'Crime') {
          data.name = 'Important';
        }
        if (data.name === 'Animation') {
          data.name = 'Lesson';
        }
        if (data.name === 'Horror') {
          data.name = 'Meetup';
        }
        if (data.name === 'Western') {
          data.name = 'Shopping';
        }
      });
      data.genres.forEach((dataEl) => {
        const option = document.createElement('option');
        selectSection.appendChild(option);
        option.value = dataEl.name;
        option.textContent = dataEl.name;
      });
      button.addEventListener('click', () => {
        saveData(selectSection.value);
      });
    } else {
      throw 'HTTP ERROR';
    }
  } catch (err) {
    console.log(err);
  }
}
//CREATE THE NOTES
function saveData(data) {
  try {
    const getTextContent = document.querySelector('#id-content');
    const getCreateTag = document.querySelector('#id-title');
    if (data === 'None' && getCreateTag.value === '') {
      alert('Please Choose a Tag or Create a New One');
    } else if (data !== 'None' && getCreateTag.value !== '') {
      alert(
        `Please Select only one. You Couldn't Choose a Tag and Create a New One At The Same Time`,
      );
    } else if (data !== 'None' || getCreateTag.value !== '') {
      const noteSection = document.querySelector('.note-section');
      const noteContainer = document.createElement('article');
      noteContainer.className = 'note-container';
      noteContainer.style.background = setColor();
      noteSection.appendChild(noteContainer);
      const noteTitleSection = document.createElement('div');
      noteTitleSection.className = 'note-title-section';
      noteContainer.appendChild(noteTitleSection);
      const title = document.createElement('a');
      title.className = 'title';
      title.href = '#';
      noteTitleSection.appendChild(title);
      const content = document.createElement('div');
      content.className = 'content';
      content.href = '#';
      noteContainer.appendChild(content);
      const contentText = document.createElement('p');
      contentText.className = 'content-text';
      content.appendChild(contentText);
      deleteNote(noteContainer);
      //searchNote(noteContainer);
      if (data !== 'None') {
        title.textContent = data;
        contentText.textContent = getTextContent.value;
        showCategory(title.textContent, noteContainer);
        searchNote(title.textContent, contentText.textContent, noteContainer);
      }
      if (getCreateTag.value !== '') {
        title.textContent = getCreateTag.value;
        contentText.textContent = getTextContent.value;
        showCategory(title.textContent, noteContainer);
        searchNote(title.textContent, contentText.textContent, noteContainer);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
//SETTING THE BACKGROUND COLOR OF NOTES
let i = 0;
function setColor() {
  var randomColor = [
    '#D3694A',
    '#D7AEFB',
    '#E8EAED',
    '#93E396',
    '#B1D0FF',
    '#C2FF3D',
    '#EBB328',
    '#04E022',
  ];
  if (i > randomColor.length - 1) {
    i = 0;
  }
  return randomColor[i++];
}

//SHOW CATEGORY BUTTON
const categoryList = [];
function showCategory(title, noteContainer) {
  const categorySection = document.querySelector('.category-section');
  const categoryButton = document.createElement('button');
  categoryButton.className = 'category dom';

  // const noteContainer = document.querySelector('.note-container');
  if (categoryList.includes(title)) {
  } else {
    categoryList.push(title);
    categoryList.map(() => {
      categoryButton.textContent = title;
      categorySection.appendChild(categoryButton);
    });
  }
  const buttonList = document.querySelectorAll('.dom');
  console.log(buttonList);
  buttonList.forEach((button) => {
    button.addEventListener('click', () => {
      noteContainer.classList.remove('hide');
      noteContainer.className = 'note-container';
    });
  });
}
//DELETE THE NOTE
function deleteNote(noteContainer) {
  const deleteButton = document.createElement('button');
  deleteButton.style.width = '60px';
  deleteButton.style.height = '60px';
  deleteButton.style.margin = 'auto';
  deleteButton.style.background = 'none';
  const buttonIcon = document.createElement('img');
  buttonIcon.src = '../img/deleteIcon.svg';
  deleteButton.appendChild(buttonIcon);
  noteContainer.appendChild(deleteButton);
  deleteButton.addEventListener('click', () => {
    noteContainer.remove();
  });
}
//SEARCH THE NOTE
let characterList = [];
function searchNote(title, contentText) {
  const searchBar = document.getElementById('search-bar');
  if (characterList.includes(title)) {
  }
  if (characterList.includes(contentText)) {
  } else {
    characterList.push(contentText);
    characterList.push(title);
  }

  searchBar.addEventListener('keyup', (e) => {
    //e.preventDefault;
    const searchString = e.target.value.toLowerCase();
    const filteredChar = characterList.filter((character) => {
      return character.toLowerCase().trim().includes(searchString);
    });
    const title2 = document.querySelectorAll('.title');
    title2.forEach((data) => {
      filteredChar.forEach((filter) => {
        if (data.innerHTML === filter) {
          data.parentElement.parentElement.classList.remove('hide'); //to get parent element
          data.parentElement.parentElement.className = 'note-container'; //after get the parent element to fix class name
        } else {
          data.parentElement.parentElement.className = 'hide';
        }
      });
    });
  });
}

fetchData();
