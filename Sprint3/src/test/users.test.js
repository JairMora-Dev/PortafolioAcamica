const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../database/db');

//const userRouter = require('../routes/users.routes');
const app = require('../index');

//const environment = process.env.NODE_ENV;
//const apiDescription = process.env.API_DESCRIPTION;

console.log(`La aplicacion se esta ejecutando en el ambiente: '${environment}'`);
console.log(`Descripcion: '${apiDescription}'`);

chai.should();
chai.use(chaiHttp);



describe('POST /Successful register', () => {
    
    function newUser(name, password, email, phone) {
        const User = { 
            name,
            password,
            email, 
            phone,
        };
        return User 
    }
   

    describe('/to valitade User register', ()=>{
        
        it('Return status 200', (done) => {
            chai.request(app)
                .post('/users/register')
                .send(newUser('test', 'test123', 'test@gmail.com', 3145569))
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.an('object');
                    done();
                });
        });
    });
    
    after (async () =>{
        await db.Users.destroy({ 
            where: { 
                email: 'test@gmail.com' 
            }
        });
    });

});







