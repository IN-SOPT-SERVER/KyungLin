import { Member } from "./member";

export interface Dinner {
    member: Member[];
    menu: string[];
    shuffle: (array: Member[]|string[]) => Member[]|string[];
    organize:  (array: Member[], menuArray: string[]) => void;
}