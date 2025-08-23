import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs"

export const seedSuperAdmin = async() =>{

    try{
      const isSuperAdminExits = await User.findOne({email:envVars.SUPER_ADMIN_EMAIL})
      if(isSuperAdminExits){
        console.log("Super admin already exist");
           return 
      }
      console.log("trying to create super admin");

      const hashPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASS, Number(envVars.BCRYPT_SALT_ROUND))

       const authProvider: IAuthProvider = {
        provider: "credential",
        providerId:envVars.SUPER_ADMIN_EMAIL
       }
      const payload:IUser = {
        name: "Super Admin",
        role: Role.Super_Admin,
        email: envVars.SUPER_ADMIN_EMAIL,
        password: hashPassword,
        isVerified:true,
        auth:[authProvider]
      }
    
      const superAdmin = await User.create(payload)
      console.log("super Admin Created Successfully");
      console.log(superAdmin);
   
    }catch(error){
        console.log(error);
    }
}