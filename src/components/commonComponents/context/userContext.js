import { createContext, useState } from 'react';

//create a context, with createContext api
export const userContextProvider = createContext();

const UserContextComponent = (props) => {
  // this state will be shared with all components 
  const [userContext, setUserContext] = useState(sessionStorage.userData);
 
  return (
    // this is the provider providing state
    <userContextProvider.Provider value={[userContext, setUserContext]}>
      {props.children}
    </userContextProvider.Provider>
  );
};

export default UserContextComponent;