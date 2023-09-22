 const useAuth = (token) => {
   if (token) {
     return true
   } else {
     return false;
   }
 }

export default useAuth
