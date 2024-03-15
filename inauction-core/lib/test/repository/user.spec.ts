import UserRepository from '../../core/repository/user/userRepository';
import { expect } from 'chai';
import { User } from '../../core/schema/user';


describe('UserRepository', () => {
    let service;
  
    beforeEach(() => {
      service = new UserRepository(User);
    });
  
    it('should get back all user', () => {
      expect(service.getAll("")).to.deep.equal(
        []
      );
    });
});