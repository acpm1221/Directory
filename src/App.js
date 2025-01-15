import React, { useState } from 'react';
import './App.css';

const App = () => {
  // State variables to store customer data and inputs
  const [customers, setCustomers] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [purchasedItem, setPurchasedItem] = useState('');
  const [price, setPrice] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');  
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle adding a new customer
  const handleAddCustomer = () => {
    if (customerName && contactNumber && purchasedItem && price && purchaseDate) {
      const newCustomer = {
        id: Date.now(),
        name: customerName,
        contact: contactNumber,
        item: purchasedItem,
        price: parseFloat(price),
        purchaseDate: purchaseDate,  
      };

      setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);

      // Clear input fields after adding the customer
      setCustomerName('');
      setContactNumber('');
      setPurchasedItem('');
      setPrice('');
      setPurchaseDate('');
    } else {
      alert('Please fill in all fields');
    }
  };

  // Handle search input 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter customers by name or contact number
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.contact.includes(searchQuery)
  );

  return (
    <div className="customer-directory-app">
      <h1>Customer Record Directory</h1>

      {/* Form to add new customer */}
      <div className="add-customer-form">
        <h3>Add New Customer</h3>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
        />
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Contact Number"
        />
        <input
          type="text"
          value={purchasedItem}
          onChange={(e) => setPurchasedItem(e.target.value)}
          placeholder="Purchased Item"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          type="date"
          value={purchaseDate}
          onChange={(e) => setPurchaseDate(e.target.value)}  // Handle purchase date input
          placeholder="Purchase Date"
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>

      {/* Search Input */}
      <div className="search-customer">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by Name or Contact"
        />
      </div>

      {/* Display filtered customers */}
      <div className="customer-list">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div key={customer.id} className="customer-card" style={styles.card}>
              <h3>{customer.name}</h3>
              <p>Contact: {customer.contact}</p>
              <p>Purchased Item: {customer.item}</p>
              <p>Price: ${customer.price.toFixed(2)}</p>
              <p>Purchase Date: {new Date(customer.purchaseDate).toLocaleDateString()}</p> {/* Display purchase date */}
            </div>
          ))
        ) : (
          <p>No customers found</p>
        )}
      </div>
    </div>
  );
};


const styles = {
  card: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
};

export default App;
