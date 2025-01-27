import bcryptjs from 'bcryptjs'


export const hashPassword=async (password)=>{

  try {
    const result=await bcryptjs.hash(password,10)
    return result
  } catch (error) {
    console.log(error)
  }

}

export const comparePassword=async(hPsssword,password)=>{
  console.log(password,hPsssword)
  try {
    const result=await bcryptjs.compare(password,hPsssword)
    return result
  } catch (error) {
    console.log(error)
  }
}