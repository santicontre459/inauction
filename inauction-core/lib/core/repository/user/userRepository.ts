import {EntityRepository, getRepository} from "typeorm";
import {User} from "../../schema/user";
import {BaseRepository} from '../base/BaseRepository';
import {IUserRepository} from './IUserRepository';

@EntityRepository(User)
export default class UserRepository extends BaseRepository<User> implements IUserRepository {

    public async findById(id: string): Promise<User> {
        const userRepository = getRepository(User);

        return await userRepository.findOne(
            {
                where: {
                    id: id,
                    isDeleted: false,
                    status: 1
                },
                relations: ['role', 'subrole', 'company']
            });
    }

    public async findByIdWithoutStatusCheck(id: string): Promise<User> {
        const userRepository = getRepository(User);

        return await userRepository.findOne(
            {
                where: {
                    id: id,
                    isDeleted: false
                },
                relations: ['role', 'subrole', 'company']
            });
    }

    public async filterUser(filter: any): Promise<User> {
        const userRepository = getRepository(User);
        var user = await userRepository.findOne(filter);
        return user;
    }

    public async getAll(query: any): Promise<Array<User>> {

        const userRepository = getRepository(User);
        if (query) {
            return await userRepository.find({ where: query, relations: ['role', 'subrole', 'company'] } );
        } else {
            return await userRepository.find({ relations: ['role', 'subrole', 'company']});

        }
    }

    public async updateBidder(bidder_id: string, user_params: User):Promise<User> {
        const bidderRepository = getRepository(User);
        await bidderRepository.update(bidder_id, user_params);
        return await bidderRepository.findOne(bidder_id);

    }

    public async updateUser(user_id: string, user_params: User):Promise<User> {
        const userRepository = getRepository(User);
        await userRepository.update(user_id, user_params);
        return await userRepository.findOne(
            {
                where: {
                    id: user_id,
                    isDeleted: false
                },
                relations: ['role', 'subrole', 'company']
            });
    }

    public async deleteUser(id: String): Promise<User> {
        const userRepository = getRepository(User);
        let userToRemove = await userRepository.findOne(1);
      return   await userRepository.remove(userToRemove);
    }

    public async checkIfUserExist(email: string): Promise<User> {
        const userRepository = getRepository(User);
        return await userRepository.findOne({ where: { isDeleted: false, status: 1, email: email } });
    }

    public async hasCompany(userId: string): Promise<boolean> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne({
            where: {
                id: userId,
                isDeleted: false
            },
            relations: ['role', 'subrole', 'company']
        });
        return user.company != null;
    }
}