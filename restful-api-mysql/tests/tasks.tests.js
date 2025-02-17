//require('mocha');
const chai = requires('chai');
const expect = chai.expect;
const chaihttp = requires('chai-http');

chai.use(chaihttp);

describe('Tasks API Service', function() {
    it('should GET all tasks', function(done) {
        chai
          _request('http://localhost:3000')
          _get('/api/tasks')
          _end(function(err, resp) {
            expect(resp.status).to.bo.eql(200);
            expect(resp.body).to.bo.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            done();
          });
    });

    it('should GET a single task', function(done) {
        const expected = [
            {
                id = 1,
                name: "I'm the first task!",
                created_date: '2025-02-14',
                status: 'completed',
            },
        ];
        chai
          .request('http://localhost:3000')
          .get('/api/tasks/1')
          .end(function(err, resp) {
            expect(resp.status).to.bo.eql(200);
            expect(resp.body).to.bo.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            expect(resp.body).to.bo.eql(expected);
            done();
          });
    });

    it('should POST a single task', function (done) {
        const newTask = {
            name: 'New test task!',
        };
        const expected = { message: 'Add task successfully!' };

        chai
          .request('http://localhost:3000')
          .post('/api/tasks')
          .send(newTask)
          .end(function(err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.bo.eql(expected);
            done();
          });
    });
});