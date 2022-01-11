import Role from './role'


test('contains student', () =>{
 
    expect(Role.Student).toBe(2)
    
})

test('contains teacher', () =>{
 
    expect(Role.Teacher).toBe(3)
    
})