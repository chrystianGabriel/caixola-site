import {ToolTip} from "tooltip.js";
declare var $:any;
export class Intro{
	private passo_atual;
	constructor(){
		this.passo_atual = 0;
	}
	init(){
		let tooltips = this.buscarPasso(this.passo_atual);
		this.destacarElemento(tooltips);
	}
	destacarElemento(tooltip){

		if(tooltip){
			tooltip.setAttribute("data-tutorial","true");
			$(tooltip).tooltip();
			let elementoClone:any = tooltip.cloneNode(true);
			let elementoPai:any = tooltip.parentNode;
			elementoClone.removeAttribute("id");
			elementoClone.removeAttribute("data-tutorial");
			elementoClone.removeAttribute("data-toggle");
			elementoClone.removeAttribute("data-placement");
			elementoClone.removeAttribute("data-original-title");
			elementoClone.removeAttribute("title");
			elementoPai.appendChild(elementoClone);
			tooltip.setAttribute("class",tooltip.getAttribute('class').replace("tutorial",""));
			let ref = this;
			tooltip.onclick = function(){
				tooltip.remove()
				ref.passo_atual++;
				let tooltips = ref.buscarPasso(ref.passo_atual);
				console.log(tooltips)
				ref.destacarElemento(tooltips);
			}


			
			
		}

	}
	buscarPasso(passo){
		let tooltips = $('[data-toggle="tooltip"]');
		for(let i = 0; i < tooltips.length;i++){
			if(tooltips[i].getAttribute("data-passo") == passo){
				return tooltips[i];
			}
		}
	}
}