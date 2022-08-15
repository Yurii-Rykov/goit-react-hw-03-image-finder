import React from 'react';
import PropTypes from 'prop-types'
import s from './Modal.module.css';

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.propClose();
    }
  };

  render() {
    const { propModalUrl, propClose } = this.props;
    return (
      <div onClick={() => propClose()} className={s.overlay}>
        <div className={s.modal}>
          <img src={propModalUrl} alt="images" />
        </div>
      </div>
    );
  }
}
export default Modal;

Modal.propTypes = {
  propModalUrl: PropTypes.string.isRequired,
  propClose:  PropTypes.func.isRequired
}