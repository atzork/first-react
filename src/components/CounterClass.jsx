import React from "react";

export class CounterClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.decrement = this.decrement.bind(this)
    }

    decrement() {
        console.log(this)
        this.setState({count: this.state.count - 1})
    }

    render() {
        return (
            <div className="class-counter">
                <p>{this.state.count}</p>
                <button onClick={() => this.setState({count: this.state.count + 1})}>+</button>
                <button onClick={this.decrement}>-</button>
            </div>
        )
    }

}