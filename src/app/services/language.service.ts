import { Events } from "ionic-angular";

export class LanguageService {
    public static readonly UPDATE_MENU_LANGUAGE_EVENT = 'update_menu_lang';

    public static publishLanguageChange(events: Events) {
        events.publish(LanguageService.UPDATE_MENU_LANGUAGE_EVENT);
    }
}