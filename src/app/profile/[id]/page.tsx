import React from 'react';

const userprofilePage =async ({params}:any) => {
  return (
    <div>
      <p>This is the profile page of id {params.id}</p>
    </div>
  );
}

export default userprofilePage;
