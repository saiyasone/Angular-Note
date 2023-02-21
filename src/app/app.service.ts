import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 } from 'uuid';
export interface Note {
  id: string;
  title: string;
  note: string;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  notes$ = new BehaviorSubject<Note[]>([]);

  get notes() {
    return this.notes$.getValue();
  }

  emptyNote() {
    let note = [];
    localStorage.setItem('notes', JSON.stringify(note));
    this.notes$.next(note);
  }

  initializeNote() {
    const noteJson = localStorage.getItem('notes');
    if (noteJson) {
      const notes = JSON.parse(noteJson);
      this.notes$.next(notes);
    } else {
      this.emptyNote();
    }
  }

  setNote() {
    let noteDefault: Note = {
      id: v4().toString(),
      title: 'Untitled Note',
      note: '',
      date: new Date(),
    };
    const note = this.notes;
    note.push(noteDefault);
    this.notes$.next(note);
    localStorage.setItem('notes', JSON.stringify(note));
  }

  updateNote(note: Note) {
    const index = this.notes.findIndex((el) => el.id === note.id);
    if (index >= 0) {
      this.notes[index].title = note.title;
      this.notes[index].note = note.note;
      this.notes[index].date = note.date;
    }

    this.notes$.next(this.notes);
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  removeNoteItem(id: string) {
    const newVal = this.notes.filter((el) => el.id !== id);
    this.notes$.next(newVal);
    localStorage.setItem('notes', JSON.stringify(newVal));
  }
}
