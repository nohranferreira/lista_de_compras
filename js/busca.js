export function inicializaBusca() {
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
}
