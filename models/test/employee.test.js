const Employee = require('../employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {
    it('should throw an error if no "firstName, lastName, department" arg', () => {
        const dep = new Employee({});

        dep.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.exist;
        })
    })

    it('should throw an error if "firstName, lastName, department" is not a string', () => {
        const cases = [{}, []];
        for(let firstName of cases) {
            const dep = new Employee({ firstName });

            dep.validate(err => {
                expect(err.errors.firstName).to.exist;
            });
        }
        for(let lastName of cases) {
            const dep = new Employee({ lastName });

            dep.validate(err => {
                expect(err.errors.lastName).to.exist;
            });
        }
        for(let department of cases) {
            const dep = new Employee({ department });

            dep.validate(err => {
                expect(err.errors.department).to.exist;
            });
        }
    });

    it('should not throw an error if "firstName, lastName, department" is okey', () => {
        const cases = [
            {
                firstName: 'Bartek',
                lastName: 'Mucha',
                department: 'IT'
            },
            {
                firstName: 'John',
                lastName: 'Doe',
                department: 'Marketing',
            },
        ];
        for (let test of cases) {
            const dep = new Employee(test);

            dep.validate(err => {
                expect(err).to.not.exist;
            })
        }
    });
});