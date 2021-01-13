import { Injectable } from '@angular/core';
import { Message } from '../messages/message';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessageBrokerService {
    private readonly subject: Subject<Message>;

    constructor() {
        this.subject = new Subject<Message>();
    }

    sendMessage(message: Message) {
        this.subject.next(message);
    }

    getMessage(): Observable<Message> {
        return this.subject.asObservable();
    }
}
