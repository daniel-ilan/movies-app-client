import React from 'react';

import CreatableSelect from 'react-select/creatable';

const MultiSelect = ({ options }) => {
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  return <CreatableSelect isMulti onChange={handleChange} options={options} />;
};

export default MultiSelect;
