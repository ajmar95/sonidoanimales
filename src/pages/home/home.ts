import { ANIMALES } from './../../data/data.animales';
import { Component } from '@angular/core';
import { Refresher, NavController, reorderArray } from 'ionic-angular';
import { Animal } from '../../interfaces/animal.interface';  

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
animales: Animal []=[];
ordenando:boolean=false;
  constructor(public navCtrl: NavController) {
this.animales=ANIMALES.slice(0);
  }
  // a:Animal se pasa por referncia
  audio = new Audio(); 
  reproducir(a:Animal){
    console.log(a);
    this.pausar_audio(a);
   
    if(a.reproduciendo){ 
      //let audio = new Audio; let se usa para una varable local y no aria falta porque audio lo cree fuera del metodo.
      a.reproduciendo=false;
      return;
    }
this.audio.src= a.audio;
this.audio.load();
this.audio.play();
a.reproduciendo=true;
this.audioTiempo = setTimeout(()=>{a.reproduciendo=false;this.audio.pause()},a.duracion*1000);

  }
  audioTiempo:any;
  private pausar_audio(animalSel:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime=0;
    for(let a of this.animales){
      if(a.nombre!= animalSel.nombre){
        a.reproduciendo=false;
      }
    }   
  }
  borrar_animal(indice:number){
    this.animales.splice(indice,1);
  }
  recargar_animales(refresher: Refresher){
    setTimeout(()=>{
    console.log ("Inicio del refresh");
    this.animales=ANIMALES.slice(0);
    refresher.complete();
  },2000);
    
  }
  reordenar_animales(indices: any){
    console.log(indices);
    this.animales=reorderArray(this.animales, indices);
  }
}
