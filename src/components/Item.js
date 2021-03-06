import React, { Component } from 'react';

class Item extends Component {

    filmTitle = () => (
        this.props.films.map(film => (
            this.props.item.films[0] === film.url ? film.title : null
        ))
    )
    
    itemProperties = () => (Object.entries(this.props.item).map((info) => info))

    itemTitle = () => (this.itemProperties().find(prop => prop[0] === 'name' || prop[0] === 'title'))
  
    render() {
        return (
            <>
            <h3 className="attr-title">{this.itemTitle()[0].toUpperCase()}: <em>{this.itemTitle()[1]}</em></h3>

            {this.props.item.name ? <h4 className="attr-title">Film: <em>{this.filmTitle()}</em></h4> : null}
            
                {this.itemProperties().map((prop, index) => {
                    if (prop[0] !== this.itemTitle()[0] && prop[0] !== 'id') {
                        if (this.props.item.name) {
                            if (prop[1].toString().includes("http") && prop[1].toString().includes("films")) {
                                fetch(`${prop[1]}`)
                                    .then(res => res.json())
                                    .then((info) => this.setState({
                                        filmTitle: info.title
                                    }))
                            }
                        }
                        if (!prop[1].toString().includes("http")) {
                            return <li key={index}><b className="attr-title">{prop[0].toUpperCase()}</b>: <em>{prop[1]}</em></li> 
                        }
                    }
                })}
               
            </>
        )
    }

    
}

export default Item;

