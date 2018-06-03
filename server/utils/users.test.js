const {expect, assert, should} = require('chai');
const {Users} = require('./users');

describe('Users', () => {
  var users;
  var usersArray = [{
    id: '1',
    name: 'Mike',
    room: 'Node Course'
  }, {
    id: '2',
    name: 'Jen',
    room: 'React Course'
  }, {
    id: '3',
    name: 'Julie',
    room: 'Node Course'
  }];

  beforeEach(() => {
    users = new Users();
    users.users = usersArray;
  });


  describe('addUser', () => {
    it('should add new user', () => {
      var users = new Users();
      var sampleUser = {
        id: '1',
        name: 'Sample User',
        room: 'Sample Room'
      };
      var addedUser = users.addUser(
        sampleUser.id, sampleUser.name, sampleUser.room);
        
      expect(addedUser).to.not.be.null;
      expect(users.users).to.deep.equal([sampleUser]);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', () => {
      var userId = '1';
      var removedUser = users.removeUser(userId);

      expect(removedUser.id).to.be.equal(userId);
      expect(users.users.filter((user) => user.id === userId).length).to.be.equal(0);
    });

    it('should not remove user', () => {
      var userId = '87';
      var user = users.removeUser(userId);

      expect(user).to.be.undefined;
      expect(users.users).to.deep.equal(usersArray);
    });
  });

  describe('getUser', () => {
    it('should find user', () => {
      var userId = '2';
      var resUser = users.getUser(userId);

      expect(resUser.id).to.be.equal(userId);
    });

    it('should not find user', () => {
      var userId = '99';
      var resUser = users.getUser(userId);

      expect(resUser).to.be.undefined;
    });
  })

  describe('getUserList', () => {
    it('should return names for node course', () => {
      var userList = users.getUserList('Node Course');

      expect(userList).to.deep.equal(['Mike', 'Julie'])
    });

    it('should return names for react course', () => {
      var userList = users.getUserList('React Course');

      expect(userList).to.deep.equal(['Jen']);
    });
  });
});
