import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './UserContext';
import API from '../api';

const MembersContext = React.createContext();

export const useMembers = () => {
  return useContext(MembersContext);
};

export const MembersContextProvider = ({ children }) => {
  const members = useMembersData();
  return (
    <MembersContext.Provider value={members}>
      {children}
    </MembersContext.Provider>
  );
};

function useMembersData() {
  const [allMembers, setAllMembers] = useState([]);
  const { authDetails } = useAuth();

  const getAllMembers = useCallback(async () => {
    try {
      const token = authDetails.token;
      const response = await API.get('/all-members', {
        headers: { Authorization: `Barer ${token}` },
      });

      setAllMembers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setAllMembers, authDetails.token]);

  const addNewMember = async (data) => {
    try {
      console.log('data', data);
      const response = await API.post('/add-new-member', data, {
        headers: { Authorization: `Barer ${authDetails.token}` },
      });
      getAllMembers();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };

  const editMember = async (data) => {
    try {
      const response = await API.post('/edit-member', data, {
        headers: { Authorization: `Barer ${authDetails.token}` },
      });
      getAllMembers();
      return response;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };

  const deleteMember = async (memberId) => {
    try {
      const response = await API.delete(`delete-member/${memberId}`, {
        headers: { Authorization: `Barer ${authDetails.token}` },
      });
      getAllMembers();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMembers();
  }, [getAllMembers]);

  return {
    allMembers,
    setAllMembers,
    addNewMember,
    editMember,
    deleteMember,
  };
}
