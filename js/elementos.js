import { itens } from "./main.js";

export function criaElemento(item) {
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

export function atualizaElemento(item) {
	document.querySelector("[data-id='" + item.id + "']").innerHTML =
		item.quantidade;
}

//Função para criar botão com evento de click nos itens, e retornar os itens clicados
export function botaoDeleta(id) {
	const elementoBotao = document.createElement("button");
	elementoBotao.classList.add("excluir");
	elementoBotao.innerHTML = '<i class="fa fa-trash"></i>';

	elementoBotao.addEventListener("click", function () {
		deletaElemento(this.parentNode, id);
	});

	return elementoBotao;
}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador

export function deletaElemento(tag, id) {
	tag.remove();

	itens.splice(
		itens.findIndex((elemento) => elemento.id === id),
		1
	);

	localStorage.setItem("itens", JSON.stringify(itens));
}
