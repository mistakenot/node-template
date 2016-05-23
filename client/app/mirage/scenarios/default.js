
export default function(server) {
  // Default dev user
  server.create('user', {
    email: 'bob@email.com',
    password: '123'
  });

}
