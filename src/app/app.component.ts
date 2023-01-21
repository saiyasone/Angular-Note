import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppService, Note } from './app.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  search = '';
  notes: Note[] = [];
  note: Note;
  ondestroy$ = new Subject<void>();

  constructor(private appService: AppService) {
    appService.initializeNote();
    appService.notes$.pipe(takeUntil(this.ondestroy$)).subscribe((note) => {
      let currentDate = note.sort((a, b) => {
        return Date.parse(b.date.toString()) - Date.parse(a.date.toString());
      });
      this.notes = currentDate;
    });
  }

  ngOnDestroy() {
    this.ondestroy$.next();
    this.ondestroy$.complete();
  }

  addNote() {
    this.appService.setNote();
  }

  activeNote(note: Note) {
    this.note = note;
  }

  updateNote(note: Note) {
    this.appService.updateNote({
      date: new Date(),
      note: note.note,
      title: note.title,
      id: note.id || '',
    });
  }

  deleteNote(id: string) {
    this.appService.removeNoteItem(id);
    this.note = null;
  }
}
