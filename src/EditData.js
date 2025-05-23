import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { addEmployee } from './app/slices/EmployeeSlice';
// import { useNavigate } from 'react-router-dom';

export default function AddNewForm({employeeId}) {
  const { register, handleSubmit ,reset} = useForm();
  const [data, setdata] = useState({});
  const dispatch = useDispatch();

//  const handlechange =(e)=>{
// console.log(e.target.value);

//   }
//  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(addEmployee(data));


      fetch("http://localhost:9000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Data submitted:", result);
        alert("Employee added successfully!");
        reset(); 
        // navigate("/");
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };
 useEffect(() => {
  if (employeeId) {  
    fetch(`http://localhost:9000/employees/${employeeId}`)
      .then((res) => res.json())
      .then((jsonData) => setdata(jsonData))
      .catch((err) => console.error('Error loading data:', err));
     
      
  }
}, [employeeId]);


  // fetch(`http://localhost:9000/employees/${employeeId}`)

  return (
   
      <form className="bg-white  px-8 pt-6 pb-8 w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="firstName">
            First Name {employeeId}
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter first name "
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("firstName", { required: true, maxLength: 20 })}
            value={data.firstName}
            onChange={(e)=>setdata({...data, firstName: e.target.value})}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter last name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("lastName", { required: true, maxLength: 20 })}
             value={data.lastName}
             onChange={(e)=>setdata({...data, lastName: e.target.value})}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email")}
             value={data.email}
             onChange={(e)=>setdata({...data, email: e.target.value})}

          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="age">
            Age
          </label>
          <input
            type="number"
            id="age"
            placeholder="Enter age"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("age", { min: 18, max: 99 })}
             value={data.age}
             onChange={(e)=>setdata({...data, age: e.target.value})}

          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
        >
          Submit
        </button>
      </form>
  
  );
}
