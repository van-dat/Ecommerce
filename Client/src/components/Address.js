import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAddress } from '../store/Slice/cartSlice';




const AddressSelector = () => {


  const dispatch = useDispatch()
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');

  const initialAddresses = [
    '123 Main St, Cityville',
    '456 Oak St, Townsville',
    '789 Pine St, Villagetown'
  ];

  useEffect(() => {
    
    setAddresses(initialAddresses);
  }, []);

  const handleAddressChange = (event) => {
    const selectedAddress = event.target.value;
    setSelectedAddress(selectedAddress);
    dispatch(getAddress(selectedAddress))
  };

  return (
    <div className="  shopee-address-selector">
      <label className="shopee-label" htmlFor="address">Address:</label>
      <select
        id="address"
        name="address"
        value={selectedAddress}
        onChange={handleAddressChange}
        className="shopee-select border-[#ddd] rounded-md"
        
      >
        <option value="" disabled>Select an address</option>
        {addresses.map((address, index) => (
          <option  key={index} value={address}>
            {address}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelector;
