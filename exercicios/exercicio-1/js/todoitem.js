// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

//@ts-check

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editar: false,
            texto: props.tarefa
        };
    }

    render() {
        if (this.state.editar) {
            return React.createElement(
                "li",
                null,
                React.createElement("input", {
                    type: "text",
                    value: this.state.texto,
                    //@ts-ignore (Ignora a próxima linha que dá erro no `evt`)
                    onChange: (evt) => this.handleTextChange(evt)
                }),
                React.createElement("button", { type: "button", onClick: (evt) => this.onSaveEdit(evt) }, "✔️"),
                React.createElement("button", { type: "button", onClick: (evt) => this.onCancelEdit(evt) }, "❌")
            );
        } else {
            return React.createElement(
                "li",
                null,
                this.props.tarefa,
                React.createElement(
                    "button",
                    {
                        type: "button",
                        onClick: (evt) => this.onEditTodo(evt)
                    },
                    "✏️"
                ),
                React.createElement(
                    "button",
                    {
                        type: "button",
                        // Quando o utilizador clica no botão, fazemos uso da função associada à `prop` `onDeleteTodo`.
                        // Quando é invocada a função, passamos-lhe o valor da variável `i` que contém o índice da tarefa a remover.
                        // Não é usado o parâmetro do evento do clique `evt`, porque não é necessário.
                        onClick: (evt) => this.props.onDeleteTodo()
                    },
                    "❌"
                )
            );
        }
    }
    onEditTodo(evt) {
        this.setState({
            editar: true,
            texto: this.props.tarefa
        });
    }

    onCancelEdit(evt) {
        this.setState({
            editar: false
        });
    }
    /**
     *
     * @param {React.ChangeEvent<HTMLInputElement>} evt
     */
    handleTextChange(evt) {
        let texto = evt.target.value;
        this.setState({ texto: texto });
    }

    onSaveEdit(evt) {
        this.setState({
            editar: false
        });
        this.props.onEditTodo(this.state.texto);
    }
}
