import React, { Component } from 'react';
import List from './List';
import Item from './Item';
import DropdownMenu from './DropdownMenu';

 

class MenuContainer extends Component {

    state = {
        items : [], 
        featuredItem : '',
        films: []
    }

    componentDidMount() {
        const films = []
        fetch(`https://ghibliapi.herokuapp.com/films`)
            .then(res => res.json())
            .then((result) => { 
                result.map(f => {
                    let film = {title: f.title, url: f.url}
                    films.push(film)
                })
                this.setState({films: films});
            }   
        )
    }

    findItem = (searchTerm) => {
        return this.state.items.find((item) => {
            if (item.title) {
                return item.title.toLowerCase() === searchTerm.toLowerCase()
            } else if (item.name) {
                return item.name.toLowerCase() === searchTerm.toLowerCase()
            }
        })
    }

    fetchAPI = (items) => {
        fetch(`https://ghibliapi.herokuapp.com/${items}`)
            .then(res => res.json())
            .then((result) => {
                this.setState({items: result});
            }   
        )
    }
    
    handleClick = (event) => {
        let item = this.findItem(event.target.textContent);
        this.setState({featuredItem: item})
    }

    dropdownClickHandle = (event) => {
        event.preventDefault();
        let search = event.target.attributes.name.value
        this.fetchAPI(search)
    }


    render() {
        return (
            <>
            <h1>Ghibli-Mazing!</h1>
            <h4>Enjoy the world of Studio Ghibli</h4>
          
            <DropdownMenu dropdownClickHandle={this.dropdownClickHandle} />

            {this.state.featuredItem !== '' ? <Item films={this.state.films} item={this.state.featuredItem}/> : <h4>Click a list item to see more...</h4>}
            
            
            <h1>From Studio Ghibli</h1>
            <div id="list-component">
                <List handleClick={this.handleClick} items={this.state.items}/>
            </div>

            </>
        )
    }

}

export default MenuContainer;

