// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

// TODO...
// TESTES

/**
 * Representa o ponto de arranque de arranque da aplicação de tarefas.
 *
 * É responsável por definir a estrutura da aplicação, e a gestão das tarefas que são manipuladas pelo utilizador.
 */
class TodoList extends React.Component {
    /**
     *
     * @param {object} props Valor inicial/defeito das propriedades que vão inicializar o objeto. Podem, por exemplo, ser usdas para definir varáveis
     * no `this.state`.
     */
    constructor(props) {
        super(props);

        //`this.state` é obrigatoriamente um objeto.
        //Se não for definido, toma o valor de `null`
        this.state = {
            /**
             * Representa as tarefas que o utilizador tem para fazer.
             */
            listaTarefas: ["Dar comida ao gato", "Estudar TI2"]
        };
    }

    //Define o que tem de ser colocado no ecrã.
    render() {
        /**
         * <div>
         *  <input type="text" id="txtDesc"/>
         *  <button type="button" onClick={(evt) => this.handleAddClick(evt)}> > </button>
         *  <ListaTodos tarefas={this.state.listaTarefas}/>
         * </div>
         */
        return React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", id: "txtDesc" }),
            React.createElement(
                "button",
                { type: "button", onClick: (evt) => this.handleAddClick(evt) },
                ">"
            ),
            React.createElement(ListaTodos, {
                tarefas: this.state.listaTarefas,
                // A prop onDeleteTodo serve como "intermediario", ou "canal" de comunicação entre a `ListaTodos` e o `TodoList`
                // Quando o utilizador clica no botão para apagar uma tarefa, a função que está neste prop é chamada com o índice `idx`.
                // (ver o 'onClick' do botão de eliminar no `ListaTodos`).
                onDeleteTodo: (idx) => this.handleDeleteTodo(idx)
            })
        );
    }

    /**
     * Adiciona o texto da caixa de texto à lista de tarefas.
     * @param {Event} evt
     */
    handleAddClick(evt) {
        let texto = document.getElementById("txtDesc").value;

        // A criação de um array auxiliar é porque não se deve alterar os valores presentes em `this.props` ou `this.state`
        // A alteração destes valores, por limitações do JS, não seria detetada pelo React, e o componente não se iria atualizar.
        // A modificação (adição da nova tarefa) é feita no array auxiliar.
        let copia = this.state.listaTarefas.slice();

        copia.push(texto);

        // Guardar o novo valor (isto é, a nova lista de tarefas) e atualizar o componente.
        this.setState({
            listaTarefas: copia
        });
    }
    /**
     *
     * @param {number} index indice do array para apagar na lista de tarefas.
     */
    handleDeleteTodo(index) {
        let aux = this.state.listaTarefas.slice();

        // Remover um elemento de 'aux', a partir do índice 'index', ou seja, estou a remover uma tarefa na posição determinado pelo utilizador.
        aux.splice(index, 1);

        this.setState({
            listaTarefas: aux
        });
    }
}

/**
 * Representa a lista de tarefas que o utilizador tem para fazer.
 */
class ListaTodos extends React.Component {
    render() {
        // Criar um array com <li/>, um por cada tarefa que foi passada em 'this.props.tarefas'
        let listaLis = [];

        for (let i = 0; i < this.props.tarefas.length; i++) {
            let tarefa = this.props.tarefas[i];
            listaLis.push(
                React.createElement(
                    "li",
                    null,
                    tarefa,
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            // Quando o utilizador clica no botão, fazemos uso da função associada à `prop` `onDeleteTodo`.
                            // Quando é invocada a função, passamos-lhe o valor da variável `i` que contém o índice da tarefa a remover.
                            // Não é usado o parâmetro do evento do clique `evt`, porque não é necessário.
                            onClick: (evt) => this.props.onDeleteTodo(i)
                        },
                        "X"
                    )
                )
            );
        }

        /**
         * <div>
         * <span> Tens {this.props.tarefas.lenght} por fazer!</span>
         * <ul className="todo-list">
         *  {listaLis}
         * </ul>
         * </div>
         */
        return React.createElement(
            "div",
            null,
            React.createElement(ContadorTarefas, {
                tarefas: this.props.tarefas
            }),
            React.createElement("ul", { className: "todo-list" }, listaLis)
        );
    }
}

function ContadorTarefas(props) {
    return React.createElement(
        "p",
        null,
        props.tarefas.length === 0
            ? "Não tens nada para fazer"
            : "Tens " + props.tarefas.length + " tarefas por fazer!"
    );
}

ReactDOM.render(
    React.createElement(TodoList, null),
    document.getElementById("app")
);
