

export class userRepository{
    save(user,type,repositories){
        throw new Error("Method 'save' must be implemented.")
    }
    findUserByEmail(email){
        throw new Error("Method 'findUserByEmail' must be implemented.")
    }
    findUserById(id){
        throw new Error("Method 'findUserById' must be implemented.")
    }
    findUserByIdWithRole(userId){
        throw new Error("Method 'findUserByIdWithRole' must be implemented.") 
    }
    findAll(){
        throw new Error("Method 'findAll' must be implemented.")
    }
    findUpdateEmployeeById(id,userId){
        throw new Error("Method 'findUpdateEmployeeById' must be implemented.")
    }
    findUpdateUserById(id, data){
        throw new Error("Method 'findUpdateUserById' must be implented.")
    }
}