import { useState } from "react"
import './App.css';
import axios from 'axios';
function App() {
  const [name, setName] = useState("")
  const [salary, setSalary] = useState(0)
  const [country, setCountry] = useState("")
  const [position, setPosition] = useState("");
  const [age, setAge] = useState(0);
  const [fdata, setFdata] = useState([]);
  const [empData, setEmpData] = useState([]);
  const displayData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getInfo');
      const data = await response.data;
      setEmpData(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/create', {
        name: name,
        age: age,
        salary: salary,
        country: country,
        position: position,
      });
      const data = await response.data;
      if (data) {
        setFdata(...fdata, data);
        console.log(data)
      } else {
        console.log('data not inserted')
      }

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className="container">
        <h1>Insert your data</h1>

        <p style={{ textAlign: 'start' }}>Employee name:</p><input type="text" onChange={(e) => { setName(e.target.value) }} required />

        <p>Age:</p><input type="number" onChange={(e) => { setAge(e.target.value) }} required />

        <p>salary(year):</p><input type="number" onChange={(e) => { setSalary(e.target.value) }} required />

        <p>Position:</p><input type="text" onChange={(e) => { setPosition(e.target.value) }} required />

        <p>country:</p><input type="text" onChange={(e) => { setCountry(e.target.value) }} required />

        <button onClick={fetchData}>Submit_Info</button>
        <div className="btn-cnt">
          <button onClick={displayData}>Display data</button>
          {
            empData.map((item, key) => {
              return(
              <>
                <div key={item.id}>

                  <p >name:{item.name}</p>
                  <p>age:{item.age}</p>
                  <p>Salary:{item.salary}</p>
                  <p>Position:{item.position}</p>


                </div>
              </>
            )})
          }
        </div>
      </div>
    </>
  )
}

export default App
