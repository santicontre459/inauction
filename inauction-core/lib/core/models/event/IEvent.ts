import { EventProgressStatus, EventVisibility, EventType } from "../../schema/event";
import { Currency } from "../../schema/currency";
import { EventCategory } from "../../schema/eventCategory";
import { Activity } from "../../schema/activity";
import { User } from "../../schema/user";

export interface IEvent {
    id?: String;
    title: string;
    referenceNumber: string;
    description: string;
    defineBudget: boolean;
    totalBudget: Number;
    expertsNumber: Number;
    currency: string;
    hasQuestionnaire: Boolean;
    eventType: EventType;
    progressStatus: EventProgressStatus;
    host: string;
    activity: Activity;
    eventCategory: EventCategory;
    visibility?: EventVisibility;
    accessibleListId?: String;
}

export interface IDraftEvent {
    id?: String;
    title: string;
    referenceNumber: string;
    description: string;
    defineBudget: boolean;
    totalBudget: Number;
    expertsNumber: Number;
    currency: Currency;
    eventType: EventType;
    progressStatus: EventProgressStatus;
    host: User;
    activity: Activity;
    eventCategory: EventCategory;
    visibility?: EventVisibility;
    accessibleListId?: String;
    hasQuestionnaire: Boolean;
}
