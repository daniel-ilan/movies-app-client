import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './UserContext';
import API from '../api';

const SubscriptionsContext = React.createContext();

export const useSubscriptions = () => {
  return useContext(SubscriptionsContext);
};

export const SubscriptionsContextProvider = ({ children }) => {
  const subscriptions = useSubscriptionsData();
  return (
    <SubscriptionsContext.Provider value={subscriptions}>
      {children}
    </SubscriptionsContext.Provider>
  );
};

function useSubscriptionsData() {
  const [allSubscriptions, setAllSubscriptions] = useState([]);
  const { authDetails } = useAuth();

  const getAllSubscriptions = useCallback(async () => {
    try {
      const token = authDetails.token;
      const response = await API.get('/all-subscriptions', {
        headers: { Authorization: `Barer ${token}` },
      });

      setAllSubscriptions(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setAllSubscriptions, authDetails.token]);

  const addNewSubscription = async (data) => {
    try {
      const response = await API.post('/add-subscription', data, {
        headers: { Authorization: `Barer ${authDetails.token}` },
      });
      getAllSubscriptions();
      return response;
    } catch (error) {
      console.log(error);
      throw new Error(error.response.data.message);
    }
  };

  const editSubscription = async (data) => {
    try {
      const response = await API.post('/edit-subscription', data, {
        headers: { Authorization: `Barer ${authDetails.token}` },
      });
      getAllSubscriptions();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubscription = async (subscriptionId) => {
    try {
      const response = await API.delete(
        `delete-subscription/${subscriptionId}`,
        {
          headers: { Authorization: `Barer ${authDetails.token}` },
        },
      );
      getAllSubscriptions();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSubscriptions();
  }, [getAllSubscriptions]);

  return {
    allSubscriptions,
    setAllSubscriptions,
    addNewSubscription,
    editSubscription,
    deleteSubscription,
  };
}
