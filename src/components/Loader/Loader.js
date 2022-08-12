import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css'

const Loader = () => {
  return (
    <div className={s.loading}>
      <ThreeDots
        height="180"
        width="180"
        radius="9"
        color="#3F51B5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
