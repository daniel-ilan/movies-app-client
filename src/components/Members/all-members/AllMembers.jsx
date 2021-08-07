import React from 'react';
import { useMembers } from '../../../context/MembersContext';
import { useSubscriptions } from '../../../context/SubscriptionsContext';
import MemberDisplay from '../member-display/MemberDisplay';
import { FlexWrap } from '../../shared/Wrapper';
const AllMembers = () => {
  const { allMembers } = useMembers();
  const { allSubscriptions } = useSubscriptions();

  const getMemberSubscriptions = (memberId) => {
    const memberSubscriptions = allSubscriptions.find(
      (subscription) => subscription.memberId === memberId,
    );
    if (!memberSubscriptions) {
      return;
    }
    return memberSubscriptions;
  };

  return (
    <FlexWrap>
      {allMembers.map((member) => {
        return (
          <MemberDisplay
            member={member}
            id={member._id}
            key={member._id}
            subscriptions={getMemberSubscriptions(member._id)}
          />
        );
      })}
    </FlexWrap>
  );
};

export default AllMembers;
