const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach((elemento) => {
	criaElemento(elemento);
});

form.addEventListener("submit", (evento) => {
	evento.preventDefault();

	const nome = evento.target.elements["nome"];
	const quantidade = evento.target.elements["quantidade"];
	const categoria = evento.target.elements["categoria"];

	const existe = itens.find((elemento) => elemento.nome === nome.value);

	const itemAtual = {
		nome: nome.value,
		quantidade: quantidade.value,
		categoria: categoria.value,
	};

	if (existe) {
		itemAtual.id = existe.id;

		atualizaElemento(itemAtual);
		//Refatoração da condicional if else, atualizando um id para cada item
		itens[itens.findIndex((elemento) => elemento.id === existe.id)] = itemAtual;
	} else {
		itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0;

		criaElemento(itemAtual);

		itens.push(itemAtual);
	}

	localStorage.setItem("itens", JSON.stringify(itens));

	nome.value = "";
	quantidade.value = "";
});

const campoBusca = document.getElementById("campoBusca");

campoBusca.addEventListener("input", function () {
	const termoDeBusca = this.value.toLowerCase();

	lista.childNodes.forEach((item) => {
		const nomeItem = item.textContent.toLowerCase();
		const estaVisivel = nomeItem.includes(termoDeBusca);

		if (estaVisivel) {
			item.classList.remove("hidden");
		} else {
			item.classList.add("hidden");
		}
	});
});

function criaElemento(item) {
	const novoItem = document.createElement("li");
	novoItem.classList.add("item");

	const numeroItem = document.createElement("strong");
	numeroItem.innerHTML = item.quantidade;
	numeroItem.dataset.id = item.id;
	novoItem.appendChild(numeroItem);

	novoItem.innerHTML += item.nome;

	const categoriaItem = document.createElement("span");
	novoItem.classList.add("categoria");
	categoriaItem.innerHTML = " [" + item.categoria + "]";
	novoItem.appendChild(categoriaItem);

	const checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.classList.add("item-checkbox");
	novoItem.appendChild(checkbox);

	novoItem.appendChild(botaoDeleta(item.id)); // Referenciar a função botaoDeleta no nó da função principal

	lista.appendChild(novoItem);
}

function atualizaElemento(item) {
	document.querySelector("[data-id='" + item.id + "']").innerHTML =
		item.quantidade;
}

//Função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta(id) {
	const elementoBotao = document.createElement("button");
	elementoBotao.classList.add("excluir");
	elementoBotao.innerHTML = '<i class="fa fa-trash"></i>';

	elementoBotao.addEventListener("click", function () {
		deletaElemento(this.parentNode, id);
	});

	return elementoBotao;
}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador

function deletaElemento(tag, id) {
	tag.remove();

	itens.splice(
		itens.findIndex((elemento) => elemento.id === id),
		1
	);

	localStorage.setItem("itens", JSON.stringify(itens));
}
