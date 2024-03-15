import { IRepo } from './../base/IBaseRepository';
import { Currency } from '../../schema/currency';
import {EventCategory} from "../../schema/eventCategory";

export interface ICurrencyRepository  extends IRepo<Currency> {

    findById(id: string): Promise<Currency>

    filterCurrency(filter: any): Promise<Currency>

    getAll(): Promise<Array<Currency>>

    getActive(): Promise<Array<Currency>>

    updateCurrency(currency_id: string, currency_params: Currency): Promise<Currency>

    deleteCurrency(id: String): Promise<boolean>
}