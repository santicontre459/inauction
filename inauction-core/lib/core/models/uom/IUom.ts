import { UomStatus } from '../../schema/uom';

export interface IUom {
    id?: String;
    title: string;
    status?: UomStatus;
}