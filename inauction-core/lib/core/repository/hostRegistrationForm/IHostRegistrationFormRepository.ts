import { IRepo } from '../base/IBaseRepository';
import { HostRegistrationForm } from '../../schema/hostRegistrationForm';

export interface IHostRegistrationFormRepository  extends IRepo<HostRegistrationForm> {

    getAll(query: any): Promise<Array<HostRegistrationForm>>
}