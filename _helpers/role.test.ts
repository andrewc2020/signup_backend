
var role = require('./role')



test('contains student', () =>{
 
    expect(role.Student).toBe("Student")
    
})

test('contains teacher', () =>{
 
    expect(role.Teacher).toBe("Teacher")
    
})