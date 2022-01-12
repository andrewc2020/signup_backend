import Role from './role'

describe.only('enum tests', () => {
    


test('contains admin',() =>{
    expect(Role.Admin).toBe(0)
})

test('contains admin',() =>{
    expect(Role.User).toBe(1)
})
test('contains student', () =>{
 
    expect(Role.Student).toBe(2)
    
})

test('contains teacher', () =>{
 
    expect(Role.Teacher).toBe(3)
    
})
});