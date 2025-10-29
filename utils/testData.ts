// utils/testData.ts
export const testData = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce'
  },
  invalidUser: {
    username: 'wrongUser',
    password: 'wrongPass'
  },
  wrongPasswordUser: {
    username: 'standard_user',
    password: 'wrongPass'
  },
  emptyUsernameUser: {
    username: '',
    password: 'secret_sauce'
  },
  emptyPasswordUser: {
    username: 'standard_user',
    password: ''
  },
  emptyUsernamePassword: {
    username: '',
    password: ''
  }
};
