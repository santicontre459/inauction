export interface ILotDetail {
    id?: String;
    title: string;
    lotid: String;
    uomid: String;
    quantity: Number;
    current_price: Number;
    qualification_price: Number;
    current_value: Number;
    qualification_value: Number;
}

export interface ILotDetailDraft {
    title: string;
    uomid: String;
    quantity: Number;
    current_price: Number;
    qualification_price: Number;
    current_value: Number;
    qualification_value: Number;
}
