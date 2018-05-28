import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
class SearchResult extends React.Component {
  render() {
    const data = [
      {
        name: "Poke Linsley",
        age: 26,
        friend: {
          name: "Jason Maurer",
          age: 23
        }
      },
      {
        name: "Tanner Linsley",
        age: 16,
        friend: {
          name: "Poke Maurer",
          age: 43
        }
      }
    ];
    const columns = [
      {
        Header: "Name",
        accessor: "name" // String-based value accessors!
      },
      {
        Header: "Age",
        accessor: "age",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        id: "friendName", // Required because our accessor is not a string
        Header: "Friend Name",
        accessor: d => d.friend.name // Custom value accessors!
      },
      {
        Header: props => <span>Friend Age</span>, // Custom header components!
        accessor: "friend.age"
      }
    ];

    return (
      <div className="summary summary--search">
        <h2>Search Result</h2>
        <ReactTable data={data} columns={columns} />

        {/* <h3>Course Result</h3>
        {this.props.searchCourse.map(key => {
          return (
            <div>
              <p>{key.userID}</p>
              <p>{key.subDate}</p>
              <p>{key.completionDate}</p>
              <p>{key.courseTask}</p>
              <p>{key.courseProgram}</p>
              <p>{key.courseInst}</p>
              <p>{key.courseNumber}</p>
            </div>
          );
        })}

        <h3>Admin Result</h3>
        {this.props.searchAdmin.map(key => {
          return (
            <div>
              <p>{key.userID}</p>
              <p>{key.subDate}</p>
              <p>{key.completionDate}</p>
              <p>{key.adminCat}</p>
            </div>
          );
        })}

        <button
          onClick={() => {
            window.print();
          }}
        >
          Print this page
        </button> */}
      </div>
    );
  }
}

export default SearchResult;
