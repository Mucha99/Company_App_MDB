const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    before(async () => {
        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });

    describe('Reading data', () => {
        before(async () => {
            const testEmpOne = new Employee({
                firstName: "Joe",
                lastName: "doe",
                department: "IT",
            });
            await testEmpOne.save();

            const testEmpTwo = new Employee({
                firstName: 'Bartek',
                lastName: 'Mucha',
                department: 'IT',
            });
            await testEmpTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        // it('should return proper document by various params with "findOne" method', async () => {
        //     const employee = await Employee.findOne({ firstName: "Joe" });
        //     const expectedName = 'Joe';
        //     expect(employee.firstName).to.be.equal("Joe");
        // });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Creating data', () => {
        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ 
                firstName: 'Adam',
                lastName: 'Kin',
                department: 'Marketing', 
            });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });
    })

    describe('Updating data', () => {
        before(async () => {
            const testEmpOne = new Employee({
                firstName: "Joe",
                lastName: "doe",
                department: "IT",
            });
            await testEmpOne.save();

            const testEmpTwo = new Employee({
                firstName: 'Bartek',
                lastName: 'Mucha',
                department: 'IT',
            });
            await testEmpTwo.save();
        });

        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Joe' }), { $set: { firstName: 'Bartek'}};
            const updatedEmployee = await Employee.findOne({ firstName: 'Bartek'});
            expect(updatedEmployee).to.not.be.null;
        });

        // it('should properly update one document with "save" method', async () => {
        //     const employee = await Employee.findOne({ firstName: "Joe" });
        //     employee.firstName = '=Joe=';
        //     await employee.save();

        //     const updatedEmployee = await Employee.findOne({ firstName: '=Joe=' });
        //     expect(updatedEmployee).to.not.be.null;
        // });

        // it('should properly update multiple documents with "updateMany" method', async () => {
        //     await Employee.updateMany({}, { $set: { firstName: "Updated!" } });
        //     const employees = await Employee.find({ firstName: "Updated!" });
        //     expect(employees.length).to.be.equal(2);
        // });

        afterEach(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Removing data', () => {
        before(async () => {
            const testEmpOne = new Employee({
                firstName: "Joe",
                lastName: "doe",
                department: "IT",
            });
            await testEmpOne.save();

            const testEmpTwo = new Employee({
                firstName: 'Bartek',
                lastName: 'Mucha',
                department: 'IT',
            });
            await testEmpTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'Joe'});
            const removedEmployee = await Employee.findOne({ firstName: 'Joe'});
            expect(removedEmployee).to.be.null;
        });

        // it('should properly remove one document with "remove" method', async () => {
        //     const employee = await Employee.findOne({ firstName: 'Joe'});
        //     await employee.remove();
        //     const removedEmployee = await Employee.findOne({ firstname: "Joe"});
        //     expect(removedEmployee).to.be.null;
        // });

        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const employees = await Employee.find();
            expect(employees.length).to.be.equal(0);
        })

        afterEach(async () => {
            await Employee.deleteMany();
        });
    })

    after(() => {
        mongoose.models = {};
    });
})