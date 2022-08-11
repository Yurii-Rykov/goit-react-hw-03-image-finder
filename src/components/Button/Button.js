import s from './Button.module.css'

const LoadMore = ({more}) => {
    return <button onClick={more} className={s.button}>Load More</button>
}
export default LoadMore;