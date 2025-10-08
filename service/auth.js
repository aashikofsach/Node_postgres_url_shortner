const sessionToUserMap = new Map() ;

export function setUser(id , user)
{
   return sessionToUserMap.set(id , user)
}

export function getUser(id)
{
   return sessionToUserMap.get(id)
}
