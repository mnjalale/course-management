import { handleResponse, handleError } from "./apiUtils";
import apiConstants from "./common/apiConstants";

const baseUrl = `${apiConstants.BASE_URL}/authors/`;

export function getAuthors() {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveAuthor(author) {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl + (author.id || ""), {
    method: author.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(author)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAuthor(authorId) {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl + authorId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
