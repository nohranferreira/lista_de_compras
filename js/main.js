import {
	criaElemento,
	atualizaElemento,
	botaoDeleta,
	deletaElemento,
} from "./elementos.js";
import { inicializaBusca } from "./busca.js";

export const form = document.getElementById("novoItem");
export const lista = document.getElementById("lista");
export const itens = JSON.parse(localStorage.getItem("itens")) || [];

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

inicializaBusca();
