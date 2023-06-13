import {Calculator} from './testService';

describe ('testService', ()=> {
    it('should add 2 numbers', ()=> {
        const service = new Calculator();
        expect(service.add(3,2)).toBe(5);
    });
    it('should subtract 2 numbers', ()=> {
        const service = new Calculator();
        expect(service.subtract(3,2)).toBe(1);
    });
    it('should multiply 2 numbers', ()=> {
        const service = new Calculator();
        expect(service.multiply(3,2)).toBe(6);
    });
    it('should divide 2 numbers', ()=> {
        const service = new Calculator();
        expect(service.divide(4,2)).toBe(2);
    });
})