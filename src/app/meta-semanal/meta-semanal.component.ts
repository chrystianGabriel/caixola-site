import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
	selector: 'app-meta-semanal',
	templateUrl: './meta-semanal.component.html',
	styleUrls: ['./meta-semanal.component.css']
})
export class MetaSemanalComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {

		$('#modalMetaSemanal').modal({
			show:true
		})

	}


}
