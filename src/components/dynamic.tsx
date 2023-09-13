'use client'

import {FC, PropsWithChildren, useEffect, useState} from 'react'

const Dynamic: FC<PropsWithChildren> = ({children})=>{
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children
}

export default Dynamic
