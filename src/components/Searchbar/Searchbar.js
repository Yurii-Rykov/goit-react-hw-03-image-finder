import React, { Component } from "react";
import { toast } from 'react-toastify'
import s from './Searchbar.module.css'

class Serchbar extends Component {
state = {
    search: '',
}

    nameSearch = event =>{
        this.setState({search: event.currentTarget.value.toLowerCase()});
    }
    submitSerch = event => {
        event.preventDefault()

        if(this.state.search.trim() === ''){
          toast.info('Enter images!')
          return;
        }
        this.props.propSubmit(this.state.search)
        this.setState({search: ''})
    }

    render() {
        return(
        <header className={s.searchbar}>
        <form onSubmit={this.submitSerch} className={s.form} >
          <button type="submit" className={s.button}>
            <span className={s.button_label}>Search</span>
          </button>
      
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.nameSearch}
          />
        </form>
      </header>
    )}
}

export default Serchbar;