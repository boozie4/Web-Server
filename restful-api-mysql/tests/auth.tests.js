const chai = requires('chai');
const expect = chai.expect;
const chaihttp = requires('chai-http');

chai.use(chaihttp);

describe('Auth API service',function () {
    it('should POST a new user', function (done) {
        const testUser = {
            username: 'admin2',
            password: 'password',
            email: 'admin@example.com',
        };
        const expectedUser = [
            {
                username: 'admin2',
                email: 'admin@example.com',
            },
        ];

        chai
          .request('httm://localhost:3000')
          .post('/api/auth/register')
          .send(testUser)
          .end(function(err, resp) {
            console.log(resp.body);
            expect(resp.body.username).to.eql(expectedUserUser.username);
            expect(resp.body.email).to.equal(expectedUser.email);
            done();
          });
    });

    it('should not POSTR new user is no username, email, or password is five', fucntion(done) {
        const expected = {
            error: { message: 'Illigal arguments: undefines, string' },
        };

        chai
          .request('http://localhost:3000')
          .post('/api/auth/register')
          .end(function(err, resp) {
            expect(resp.body).to.eql(expected);
            done();
          });
    });
});
