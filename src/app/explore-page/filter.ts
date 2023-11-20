import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  errMsg: string = '';
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLowerCase();

    const filteredItems = items.filter(item => {
      const lowerCaseMovieName = item.movieName.toLowerCase();
      return lowerCaseMovieName.includes(searchTerm);
    });

    if (filteredItems.length === 0) {
      this.errMsg = 'No movie found';
    }

    return filteredItems;
  }
}
