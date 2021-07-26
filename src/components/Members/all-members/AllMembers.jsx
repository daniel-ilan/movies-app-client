import React from 'react';
import { useMembers } from '../../../context/MembersContext';

const AllMembers = () => {
  const { allMembers } = useMembers();
  console.log(allMembers);
  return (
    <>
      {allMembers.map((member) => {
        return;
      })}
    </>
  );
};

export default AllMembers;
