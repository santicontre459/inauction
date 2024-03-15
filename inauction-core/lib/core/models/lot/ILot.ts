import { LotType } from '../../schema/lot';

export interface ILot {
    id?: String;
    type: LotType;
    title: string;
    eventid: String;
    total_current_value: Number;
    total_current_qualification_value: Number;
}
export interface ILotDraft {
    id?: String;
    lotName: string;
    data: [];
}