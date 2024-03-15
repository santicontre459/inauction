import { BusinessOperationStatus } from '../../schema/businessOperation';

export interface IBusinessOperation {
    id?: String;
    name: string;
    status?: BusinessOperationStatus;
}