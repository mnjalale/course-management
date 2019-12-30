import PropTypes from "prop-types";

const author = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string.isRequired
});

const authors = PropTypes.arrayOf(author);

const course = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string,
  authorId: PropTypes.number,
  category: PropTypes.string.isRequired
});

const courses = PropTypes.arrayOf(course);

export default {
  author,
  authors,
  course,
  courses
};
