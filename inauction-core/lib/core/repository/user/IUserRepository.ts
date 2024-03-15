import { IRepo } from '../base/IBaseRepository';
import { User } from '../../schema/user';

export interface IUserRepository  extends IRepo<User> {

    findById(id: string): Promise<User>
    findByIdWithoutStatusCheck(id: string): Promise<User>

    filterUser(filter: any): Promise<User>

    getAll(query: any): Promise<Array<User>>

    updateUser(bidder_id: string,user_params: User): Promise<User>

    updateBidder(bidder_id: string,user_params: User): Promise<User>

    deleteUser(id: String): Promise<User> 
    checkIfUserExist(email: string) : Promise<User>

    hasCompany(id: string): Promise<boolean>
}