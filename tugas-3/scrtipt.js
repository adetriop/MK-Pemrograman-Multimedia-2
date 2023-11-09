const tagsElement = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = '';
    }, 10);
    randomSelect();
  }
});

function createTags(input) {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim());
  tagsElement.innerHTML = '';

  tags.forEach((tag) => {
    const tagElement = document.createElement('span');
    tagElement.classList.add('tag');
    tagElement.innerText = tag;
    tagsElement.appendChild(tagElement);
  });
}

function randomSelect() {
  const times = 50; //5 detik
  const ms = 100;


  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => {
      unHighlightTag(randomTag);
    }, ms);
  }, ms);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, ms);
  }, times * ms);
}

function pickRandomTag() {
  const tags = document.querySelectorAll('.tag');
  if (tags.length > 0) {
    return tags[Math.floor(Math.random() * tags.length)];
    
  } else {
    return null;
  }
}

function highlightTag(tag) {
  if (tag !== null) {
    tag.classList.add('highlight');
  }
}

function unHighlightTag(tag) {
  if (tag !== null) {
    tag.classList.remove('highlight');
  }

}
