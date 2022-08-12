import s from './Button.module.css'
import PropTypes from 'prop-types'

const LoadMore = ({more}) => {
    return <button onClick={more} className={s.button}>Load More</button>
}
export default LoadMore;


LoadMore.propTypes = {
    more: PropTypes.func.isRequired
}