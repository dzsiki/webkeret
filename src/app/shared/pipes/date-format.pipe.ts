import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let reszek = value.split(" ");
    let pontos = reszek[1].split(":");

    let plusz= Number(pontos[0])+1;
    let formatted = reszek[0] + " " +  pontos[0] + " óra " + pontos[1] + " perctől " + plusz + " óra " + pontos[1] + " percig.";
    return formatted;
  }

}
