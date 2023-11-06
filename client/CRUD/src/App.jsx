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
  const [update,setUpdate]=useState("");
  const updateInfo=async(oldname)=>{
    try{
          const response=await axios.put(`http://localhost:3000/updateInfo/${oldname}`,{
            name: update,
            age: age,
            salary: salary,
            country: country,
            position: position,

          })
          if(response){
            console.log('data is updated')
          }else{
            console.log('data is not found')
          }
    }catch(err){
      console.log(err);
    }
  }
  const deleteData=async(emp)=>{
    try{
      const response=await axios.delete(`http://localhost:3000/deleteInfo/${emp}`);
      if(response){
        console.log('the data is delete');
        displayData();
      }
    }catch(err){
      console.log(err);
    }

  }
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
        displayData();
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

        <button onClick={fetchData} className="submit_btn">Submit_Info</button>
        <div className="btn-cnt" >
          
          <button onClick={displayData} type="submit" className="submit_btn">Display data</button>
         
          {
            empData.map((item, key) => {
              return(
              
              <>
                <div key={item.id} className="devinfo" >

                  <p >name:{item.name}</p>
                  <p>age:{item.age}</p>
                  <p>Salary:{item.salary}</p>
                  <p>Position:{item.position}</p>
                  <div className="updateValue">
                    <button className="btn_del" onClick={()=>{deleteData(item.name)}}>Delete</button>
                    <input type="text" className="inputUpdate" style={{width:'100%',textAlign:'center'}} placeholder="Update value" onChange={(e)=>{setUpdate(e.target.value)}}/>
                    <button className="btn_del" onClick={()=>{updateInfo(item.name)}}>Update</button>
                  </div>
                      
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
