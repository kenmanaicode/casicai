// Sistema de comentarios del blog.
// Los comentarios se guardan en localStorage del navegador.

const commentForm = document.getElementById("commentForm");
const commentsList = document.getElementById("commentsList");
const STORAGE_KEY = "bitacoraDigitalComments";

function loadComments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error("No se pudieron cargar los comentarios:", error);
    return [];
  }
}

let comments = loadComments();

function saveComments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function showComments() {
  commentsList.replaceChildren();

  if (comments.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Todavía no hay comentarios. ¡Sé la primera persona en comentar!";
    commentsList.appendChild(empty);
    return;
  }

  comments.forEach((comment, index) => {
    const card = document.createElement("article");
    card.className = "comment";

    const head = document.createElement("div");
    head.className = "comment-head";

    const name = document.createElement("strong");
    name.textContent = comment.name;

    const date = document.createElement("small");
    date.textContent = comment.date;

    const message = document.createElement("p");
    message.textContent = comment.text;

    const remove = document.createElement("button");
    remove.className = "delete-btn";
    remove.type = "button";
    remove.textContent = "Eliminar";
    remove.setAttribute("aria-label", "Eliminar comentario de " + comment.name);

    remove.addEventListener("click", () => {
      if (confirm("¿Quieres eliminar este comentario de este navegador?")) {
        comments.splice(index, 1);
        saveComments();
        showComments();
      }
    });

    head.append(name, date);
    card.append(head, message, remove);
    commentsList.appendChild(card);
  });
}

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("commentName").value.trim();
  const text = document.getElementById("commentText").value.trim();

  if (!name || !text) {
    alert("Completa tu nombre y tu comentario.");
    return;
  }

  comments.unshift({
    name: name,
    text: text,
    date: new Date().toLocaleString("es")
  });

  saveComments();
  commentForm.reset();
  showComments();
});

showComments();
