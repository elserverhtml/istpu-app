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
    getRequest() {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://shrouded-journey-64297.herokuapp.com/index.php');
        xhr.send({login: "еуче"});
        xhr.onload = function() {
            if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
              alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else { // если всё прошло гладко, выводим результат
              alert(`Готово, получили ${xhr.responseText} байт`); // response -- это ответ сервера
            }
          };
    }
    render() {
        return (
            <div className="card" onClick = {() => this.getRequest()}>
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

    cardClick() {
        this.setState({lessons : this.state.lessons.concat([ "1" ]) });
    }

    render() {
        return (
            <div className="main-screen">
                <div className="header" onClick = {() => this.cardClick()}>
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