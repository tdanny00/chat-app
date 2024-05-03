import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MessageService, Message } from '../../services/firebase.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  messages: Message[] = [];
  previousMessageId!: number;

  visibleMessages: Message[] = []; // Array to hold currently visible messages
  pageSize: number = 10; // Number of messages to load per page
  currentIndex: number = 0; // Index to keep track of the last loaded message

  private readonly objectDestroySource$ = new Subject<void>();

  constructor(
    private firebaseService: MessageService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.firebaseService
      .getMessages()
      .pipe(takeUntil(this.objectDestroySource$))
      .subscribe((data) => {
        this.messages = data.sort((a, b) => Number(a.id) - Number(b.id));

        const messageIds = this.messages.map((data) => data.id);

        this.visibleMessages = this.messages;

        console.log(messageIds);
        this.previousMessageId = messageIds[messageIds.length - 1];
      });

    this.initForm();
  }

  ngOnDestroy() {
    this.objectDestroySource$.next();
    this.objectDestroySource$.complete();
  }

  initForm() {
    this.form = this.formBuilder.group<Message>({
      message: '',
      id: 0,
      username: '',
      userImage: '',
      date: '',
    });
  }

  sendMessage() {
    const formValue = this.form.getRawValue();
    const currentUser = this.loginService.getCurrentUser();

    if (currentUser) {
      const newMessage: Message = {
        id: this.previousMessageId ? this.previousMessageId + 1 : 1,
        message: formValue.message,
        userImage: this.loginService.getCurrentUser()?.photoURL as string,
        username: currentUser.displayName as string,
        date: new Date().toDateString(),
      };

      this.firebaseService.sendMessage(newMessage);

      this.form.reset();
    }
  }

  loadMoreMessages() {
    if (this.messages) {
      // Push the next batch of messages to visibleMessages
      const nextMessages = this.messages.slice(
        this.currentIndex,
        this.currentIndex + this.pageSize,
      );

      this.visibleMessages.push(...nextMessages);

      // Update currentIndex
      this.currentIndex += this.pageSize;

      // Check if there are more messages to load

      console.log(this.visibleMessages);
    }
  }
}
