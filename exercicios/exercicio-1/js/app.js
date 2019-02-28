// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

// TODO...

class TodoList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listaTarefas: [
                "Dar comida ao gato",
                "Estudar TI2"
            ]
        }
    }

    render() {


        return React.createElement("div", null,
            React.createElement("input", { type: "text", id: "txtDesc" }),
            React.createElement("button", { type: "button", onClick: (evt) => this.handleAddClick(evt) }, ">"),
            React.createElement(ListaTodos,{tarefas: this.state.listaTarefas})

        )
    }

    handleAddClick(evt) {
        let texto = document.getElementById("txtDesc").value;
        let copia = this.state.listaTarefas.slice();


        copia.push(texto);

        this.setState({
            listaTarefas: copia
        });
    }
}

class ListaTodos extends React.Component {
    render() {
        let listaLis = [];

        for (let tarefa of this.props.tarefas) {
            listaLis.push(
                React.createElement("li", null, tarefa)
            )
        }

        return React.createElement("ul", {className:"todo-list"},
            listaLis
        )
    }
}




ReactDOM.render(
    React.createElement(TodoList, null),
    document.getElementById("app")
);