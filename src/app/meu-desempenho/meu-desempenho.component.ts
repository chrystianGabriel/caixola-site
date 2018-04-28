import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-desempenho',
  templateUrl: './meu-desempenho.component.html',
  styleUrls: ['./meu-desempenho.component.css']
})
export class MeuDesempenhoComponent implements OnInit {

  private desempenhoDiario;
  constructor() { 
  	this.desempenhoDiario = undefined;
  }

  ngOnInit() {
  }

}
