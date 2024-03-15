import { LegalFormStatus } from '../../schema/legalForm';

export interface ILegalForm {
    id?: String;
    title: string;
    description: String;
    status?: LegalFormStatus;
}