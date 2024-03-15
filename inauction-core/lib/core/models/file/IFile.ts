import {
    Type,
    InauctionType,
    Name
} from "../../schema/file";
import { Company } from "../../schema/company";
import { Event } from "../../schema/event";

export interface IFile {
    id?: string;
    name: Name;
    fileName: string;
    type: Type;
    path: string;
    company: Company;
    event?: Event;
    uploadedBy: String;
    inauctionType: InauctionType;
}