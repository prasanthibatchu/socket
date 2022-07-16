import { Button } from "@mui/material";
import {Link} from 'react-router-dom'
import React from "react";
import dataa from "./data.json";
export const Dashboard = () => {

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <div>
        <center>
          <table>
            <thead>
              <th>ID</th>
              <th>NAME</th>
            </thead>
            {dataa.map((item) => {
              return (
                <tbody key={item.id}>
                  <tr>
                    
                    <td>{item.id}</td>
                    <td> {item.name}</td>
                  
                  </tr>
                  
                </tbody>
              );
            })}
          </table>
          <Button variant="contained" component={Link} to="/add">add</Button>
        </center>
      </div>
    </div>
  );
};
