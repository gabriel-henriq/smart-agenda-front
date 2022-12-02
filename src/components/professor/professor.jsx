import axios from "axios";
import {useEffect, useState} from "react";

function Professor() {
  const professor = {
    name: "",
    labelColor: ""
  };
  const [formProfessor, setFormProfessor] = useState(professor);

  const [mapProfessor, setmapProfessor] = useState(null)

  useEffect(() => {
    const fetchProfessor = async () => {
      const res = await axios.get("http://localhost:5000/v1/professor?pageID=1&pageSize=5")


      console.log(res.data)
      setmapProfessor(res.data)
    }

    fetchProfessor()
  }, [])

  const onChange = (e) => setFormProfessor((prevState) => (
    { ...prevState,
      [e.target.id]: e.target.value
    }));

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      const response = axios.post("http://localhost:5000/v1/professor", formProfessor)
    } catch (e) {

    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label form="name">Name</label>
        <input type="text" id="name" onChange={(e) => onChange(e)} />

        <br/>
        <br/>

        <label form="labelColor">LabelColor</label>
        <input type="text" id="labelColor" onChange={(e) => onChange(e)} />


          <button type="submit">Criar</button>
      </form>


      <br/>
      <br/>
      <br/>
      <br/>

      {mapProfessor.map(p => {
        const {name, labelColor} = p

        return <div>
          <h1>{name}</h1>
          <h2>{labelColor}</h2>
        </div>
      })}

    </>
  );
}

export default Professor;