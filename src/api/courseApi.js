import { handleResponse, handleError } from "./apiUtils";
import apiConstants from "./common/apiConstants";
// const baseUrl = process.env.REACT_APP_API_URL + "/courses/";
const baseUrl = `${apiConstants.BASE_URL}/courses/`;

export function getCourses() {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function getCourseBySlug(slug) {
  // eslint-disable-next-line no-undef
  return fetch(`${baseUrl}?slug=${slug}`)
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok.");
      return response.json().then(courses => {
        if (courses.length !== 1) throw new Error(`Course not found: ${slug}`);
        return courses[0]; // should only find one course for a given slug, so return it.
      });
    })
    .catch(handleError);
}

export function saveCourse(course) {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl + (course.id || ""), {
    method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...course,
      // Parse authorId to a number (in case it was sent as a string).
      authorId: parseInt(course.authorId, 10)
    })
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(courseId) {
  // eslint-disable-next-line no-undef
  return fetch(baseUrl + courseId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
