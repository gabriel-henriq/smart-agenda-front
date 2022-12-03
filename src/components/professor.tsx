import axios from "axios";
import React, {useEffect, useState} from "react";

interface Professor {
    id: number;
    name: string;
    labelColor: string;
    createdAt?: number;
    updatedAt?: number;
}

interface Pagination {
    limit: number;
    skip: number;
    totalItems: number;
    totalPages: number;
}

interface ListProfessor {
    professors: Professor[];
    pagination: Pagination

}

export default function ProfessorC() {
    const [formProfessor, setFormProfessor] = useState<Professor>({} as Professor);

    const [getProfessor, setProfessor] = useState<ListProfessor>({} as ListProfessor)

    useEffect(() => {
        const fetchProfessor = async () => {
            const res = await axios.get<ListProfessor>("http://localhost:5000/v1/professor?pageId=1&pageSize=5")
            // console.log(res.data)
            setProfessor(res.data)
        }

        fetchProfessor()
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormProfessor((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
      }));
    };

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const { data } = await axios.post<Professor>("http://localhost:5000/v1/professor", formProfessor)
            setProfessor((prevState) => ({
                ...prevState,
                professors: [...getProfessor.professors, data]
            }))
            // console.log(getProfessor)
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
            {
                getProfessor.professors && getProfessor.professors.map((prof) => {
                    const {id, name, labelColor} = prof;
                    return (
                        <div key={id}>
                            <h1>{name}</h1>
                            <h2>{labelColor}</h2>
                        </div>
                    );
                })
            }

        </>
    );
}
