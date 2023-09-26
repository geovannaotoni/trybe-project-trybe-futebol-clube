const invalidEmailLoginBody = {
  email: 'invalidEmail',
  password: '123456',
}

const invalidPasswordLoginBody = {
  email: 'tfc@projeto.com',
  password: '123',
}

const validLoginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const registeredUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export {
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  registeredUser,
}