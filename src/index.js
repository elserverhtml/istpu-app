import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function LessonButton(props) {
    return (<button className="lessonButton"></button>)
}


function PersonCard(props) {
    return (
        <div></div>
    )
}

class LessonCard extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-text-block">
                    <div className="card-text-main">{this.props.data[0]}</div>
                    <div className="card-text-main">{this.props.data[1]}</div>
                    <div className="card-text-second">{this.props.data[2]}</div>
                    <div className="card-text-second">{this.props.data[3]}</div>
                </div>
                <div className="card-buttons">
                    <LessonButton />
                    <LessonButton />
                    <LessonButton />
                </div>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons : [["Математика 1.2", "12:40 - 13:30", "Устинова И.Г.", "к. 10 ауд. 412", {num:3, buttons:["1", "2", "3"] } ]],
        }
    }

    cardClick(obj) {
        this.setState({lessons : this.state.lessons.concat(obj) });
    }

    getRequest() {
        let self = this;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://shrouded-journey-64297.herokuapp.com/index.php');
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
        xhr.onload = function() {
            if (xhr.status !== 200) {
              alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
            } else {
              self.cardClick([JSON.parse(xhr.responseText)]);
            }
          };
    }

    componentDidMount() {
        this.getRequest();
    }

    render() {
        return (
            <div className="main-screen">
                <div className="header" onClick = {() => this.getRequest()}>
                    <PersonCard />
                </div>
                <div className="line" />
                <div className="horizontal-container">
                    {this.state.lessons.map( x => <LessonCard data = {x}/> )}
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);