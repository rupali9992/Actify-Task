import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { CSVLink } from "react-csv";
import AddNewForm from './Add-new';

function App() {
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState('');
  const [update, setupdate] = useState(null);
 

  useEffect(() => {
    fetch('http://localhost:9000/employees')
      .then((res) => res.json())
      .then((jsonData) => setdata(jsonData))
      .catch((err) => console.error('Error loading data:', err));
  }, []);

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setdata(updatedData);
  };

  const handleEdit = (id) => {
  
   setupdate(id);
    
  };

  const handleAdd = () => {
    // navigate("/add-new");
  };

  const filteredData = data.filter((item) =>
    item.firstName.toLowerCase().includes(search.toLowerCase()) ||
    item.lastName.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

        <div className="col-span-12 md:col-span-8 bg-white p-4 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Employee Table</h1>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-2">
              <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">
                <CSVLink data={data} filename={"my-file.csv"} target="_blank">
                  Export Data
                </CSVLink>
              </button>
              <button
                onClick={handleAdd}
                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
              >
                Add New Entry
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border">Sr.No</th>
                  {/* <th className="py-2 px-4 border">ID</th> */}
                  <th className="py-2 px-4 border">First Name</th>
                  <th className="py-2 px-4 border">Last Name</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Age</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="text-center hover:bg-gray-100">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      {/* <td className="py-2 px-4 border">{item.id}</td> */}
                      <td className="py-2 px-4 border">{item.firstName}</td>
                      <td className="py-2 px-4 border">{item.lastName}</td>
                      <td className="py-2 px-4 border">{item.email}</td>
                      <td className="py-2 px-4 border">{item.age}</td>
                      <td className="py-2 px-4 border space-x-2">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Add New Employee</h2>
          <AddNewForm  employeeId={update}/>
        </div>
      </div>
    </div>
  );
}

export default App;
