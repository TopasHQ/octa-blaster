import { useEffect } from 'react';

type Props = {
  appId: string;
};

/** Mock tipper */
const Tipper = ({ appId }: Props) => {
  useEffect(() => {
    console.debug(`Tipping enabled for app: ${appId} `);
  }, [appId]);

  return null;
};

export default Tipper;
