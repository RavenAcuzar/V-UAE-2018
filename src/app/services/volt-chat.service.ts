import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Storage } from '@ionic/storage';
import { encodeObject, openSqliteDb } from "../app.utils";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Observable } from "rxjs/Observable";
import { Subscriber } from "rxjs/Subscriber";
import { Subject } from "rxjs/Subject";

export type VoltChatEntry = {
    message: string,
    sender: string,
    dateSent: number,
    dateSentStr: string,
    selected?: boolean
};

@Injectable()
export class VoltChatService {

    private chatObservable: Subject<VoltChatEntry>;
    private chatClearObservable: Subject<void>;

    constructor(
        private http: Http,
        private storage: Storage,
        private sqlite: SQLite
    ) {
        this.chatObservable = new Subject();
        this.chatClearObservable = new Subject<void>();
    }

    getObservableChat() {
        return this.chatObservable;
    }

    getObservableChatClear() {
        return this.chatClearObservable;
    }

    getPreviousMessages() {
        return this.prepareVoltChatTable().then(db => {
            return db.executeSql(`SELECT * FROM volt_chat_vcon`, []);

        }).then(a => {
            try {
                let chatEntries: VoltChatEntry[] = []
                for (let i = 0; i < a.rows.length; i++) {
                    let rawChatEntry = a.rows.item(i);

                    let chatEntry: VoltChatEntry = {
                        message: rawChatEntry.message,
                        dateSent: rawChatEntry.dateSent,
                        sender: rawChatEntry.sender,
                        dateSentStr: rawChatEntry.datesent,
                    }
                    chatEntries.push(chatEntry);
                }
                return chatEntries;
            } catch (e) {
                throw new Error();
            }
        });
    }

    sendMessage(message: string): Promise<void> {
        let date = Date.now();
        let dateStr = new Date(date).toLocaleTimeString();
        let selected = true;

        let newMessage: VoltChatEntry = {
            sender: 'You',
            message: message,
            dateSent: date,
            dateSentStr: dateStr,
            selected: selected
        };

        return this.pushMessage(newMessage).then(() => {
            let selected = true;

            return this.http.get('http://cums.the-v.net/apiai.aspx?ask=' + encodeURI(message))
                .map(r => r.text()).toPromise().then(message => {
                    let time = Date.now();
                    let timeStr = new Date(time).toLocaleTimeString();

                    return this.pushMessage({
                        message: message,
                        dateSent: time,
                        sender: 'Volt',
                        dateSentStr: timeStr,
                        selected: selected
                    }).then(() => { });
                });
        });

    }

    pushMessage(chatEntry: VoltChatEntry): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            return this.prepareVoltChatTable().then(db => {
                let query = 'INSERT INTO volt_chat_vcon(sender, message, datesent) VALUES(?, ?, ?)';
                return db.executeSql(query, [
                    chatEntry.sender,
                    chatEntry.message,
                    new Date(chatEntry.dateSent).toLocaleString()
                ]);
            }).then(a => {
                if (a.rowsAffected === 1) {
                    this.chatObservable.next(chatEntry);
                    resolve();
                } else {
                    throw new Error('not_successfully_inserted');
                }
            });
        });
    }

    deleteUserConversation() {
        return this.prepareVoltChatTable().then(db => {
            return db.executeSql(`DELETE FROM volt_chat_vcon`, []);
        }).then(a => {
            this.chatClearObservable.next();
            return true;
        });
    }

    private prepareVoltChatTable() {
        return openSqliteDb(this.sqlite).then(db => {
            return this.createVoltChatTable(db);
        });
    }

    private createVoltChatTable(db: SQLiteObject) {
        return new Promise<SQLiteObject>((resolve, reject) => {
            try {
                db.executeSql(`CREATE TABLE IF NOT EXISTS volt_chat_vcon(
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        sender TEXT NOT NULL,
                        message TEXT NOT NULL,
                        datesent TEXT NOT NULL)`, [])
                    .then(() => { resolve(db); })
                    .catch(e => { reject(e); })
            } catch (e) {
                reject(e);
            }
        });
    }
}