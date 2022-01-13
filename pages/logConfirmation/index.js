import React from 'react';
import { getSession } from 'next-auth/react';

import LogConfirmation from '@/components/LogConfirmation/LogConfirmation';

const index = () => {
  return <LogConfirmation />;
};

export default index;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}
