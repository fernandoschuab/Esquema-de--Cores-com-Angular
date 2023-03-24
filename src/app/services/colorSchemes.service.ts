import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface tokenStoreInterface {
  uid: string,
  attendantName: string
}
@Injectable({
  providedIn: 'root'
})

export class colorSchemesService  {


  constructor() {

  }
  

   saveColors(obj: any): void {
    console.log('%cMyProject%cline:20%cobj', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(248, 214, 110);padding:3px;border-radius:2px', obj)

    let now: Date = new Date();
    localStorage.setItem(`EsquemaDeCor:${now}`, JSON.stringify(obj));

   
   }
getAllColors(){
  let all = []
  for(let i = 0; i <localStorage.length;i++){
    let nKey = localStorage.key(1);
    let res = localStorage.getItem(nKey ||'')
    all.push(res)
}
return all;
}
getColorsById(n: number): any{
  let nKey = localStorage.key(n);
  let res = localStorage.getItem(nKey ||'')
  if(res){
    return JSON.parse(res) 
  }else{
    return []
  }

  }



}