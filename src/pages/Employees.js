import React, { Component } from 'react';
import Button from '../components/Button';
import getRandomUser from "../utils/API";

class Employees extends Component {
  state = {
    employeeList : []
  }

  componentDidMount()
  {
    getRandomUser()
    .then((res) => this.setState({employeeList: res.data.results}));
  }

  onSortByName = () =>
  {
    // Make a new state.
    const newState = {...this.state};
    // Map the list of employees into a new list of just first names.
    const employeeNames = newState.employeeList.map((emp)=> {return emp.name.first});
    // Sort the new list of first names.
    employeeNames.sort();
    // Compare sorted list to existing list and return matches into a new array.
    const sortedEmployees = employeeNames.map((emp) => {
      for (let i = 0; i < newState.employeeList.length; i++)
      {
        if(emp === newState.employeeList[i].name.first)
        {
          return newState.employeeList[i];
        }
      }
    });
    console.log("Sorted by first name.");

    // Assign sorted full list to new state.
    newState.employeeList = sortedEmployees;
    // Set new state.
    this.setState(newState);
  }

  onFilterByCountry = () => {
    // Make a new state.
    const newState = {...this.state};

    // Filter existing array to new array only containing people from US.
    const USEmployees = newState.employeeList.filter((employee)=> {
      if(employee.location.country === 'United States')
      {
        return employee;
      }
    });

    // Set new list to new state.
    newState.employeeList = USEmployees;

    console.log("Filtered by country.");
    // Set new state.
    this.setState(newState);
  }

  render() {
    return (
      <>
        {/* Sort by name button */}
        <Button onClick={this.onSortByName} name="Sort By Name" />
        {/* Filter by country */}
        <Button onClick={this.onFilterByCountry} name="Filter By US" />


        {/* Display all the employees in the array. */}
        {this.state.employeeList.map((employee, index) => {
          return <div className='mb-5' key={index}>
            <h1>{employee.name.first + " " + employee.name.last}</h1>
            <img src={employee.picture.large} alt={`${employee.name.first} profile picture`} />
            <p>{employee.location.city}, {employee.location.country}</p>
            <p>{employee.email}</p>
          </div>
          }
        )}
      </>
    );
  }
}

export default Employees;
