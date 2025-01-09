import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface UserInterface {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = signal('');
  users = signal<UserInterface[]>([]);

  // effect will be triggered after change of inside call signals , it is used for reactive or side effect process
  titleChangeEffect=effect(()=>{
    console.log('titleChangeEffect',this.title())
  })

  userTotal = computed(()=>this.users().length)

  changeTitle(event: Event) {
    const title = (event.target as HTMLInputElement).value

    // to update signal we have set , update and mutate(discarded)
    this.title.set(title);

  }

  ngOnInit(): void {
    setTimeout(() => {
      // set is replace current signal value with new
      this.users.set([{ id: '1', name: 'rohit' }])

      // update gives previous values
      this.users.update(preUsers => [...preUsers, { id: '2', name: 'Viresh' }])

      console.log(this.users())

    }, 2000)

  }
}
