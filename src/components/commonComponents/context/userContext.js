import { createContext, useEffect, useState } from 'react';

//create a context, with createContext api
export const userContextProvider = createContext();



const UserContextComponent = (props) => {
  // this state will be shared with all components 
  const [userContext, setUserContext] = useState("");
  console.log('context')
  useEffect (()=>{
    //user is a string. I need to parse it. But "" or undefind can't be parsed
    let sessionData
    sessionData = sessionStorage?.userData ? JSON.parse(sessionStorage.userData) : ""
    console.log('context use effect:',sessionData)
    setUserContext (sessionData)
  },[])
 
  return (
    // this is the provider providing state
    <userContextProvider.Provider value={[userContext, setUserContext]}>
      {props.children}
    </userContextProvider.Provider>
  );
};

export const checkPermission = (area,permissions) => { 
  if (permissions === undefined) return true
  if (permissions === "") return false 
  return permissions.includes(area)
}

export default UserContextComponent;