import PropTypes from 'prop-types'

export const FetchApi = (query, page) => {
  return  fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=28565156-d6a8869547fee06a320be5b89&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(new Error(`Error please try again letter`));
        })
}

FetchApi.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number
}