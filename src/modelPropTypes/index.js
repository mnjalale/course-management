import PropTypes from "prop-types";

const author = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
});

const authors = PropTypes.arrayOf(author);

const course = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired
});

const courses = PropTypes.arrayOf(course);

export default {
  author,
  authors,
  course,
  courses
};
