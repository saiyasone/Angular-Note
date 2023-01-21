import { Pipe, PipeTransform } from '@angular/core';
import { Note } from './app.service';

@Pipe({
  name: 'noteFilter',
})
export class noteFilterPipe implements PipeTransform {
  transform(notes: Note[], searchValue: string): Note[] {
    if (!notes || !searchValue) {
      return notes;
    }
    return notes.filter((note) =>
      note.title.toLocaleLowerCase().includes(searchValue)
    );
  }
}
