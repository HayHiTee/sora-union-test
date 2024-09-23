"use client"

import {BACKEND_BASE_URL} from "@/constants/config.constants";
import {useEffect, useState} from "react";

const FileSort =  ()=>{
    const [files, setFiles] = useState<IDataType[]> ([])
    useEffect( () => {
        const fetchApi =  async ()=>{
            const url = `${BACKEND_BASE_URL}/api/data`
            const res = await fetch(url,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json'
                },

            })
            let data = []
            if(res.ok){
                 data = await res.json()
            }

            data.sort(function(a,b){
                return new Date(a.createdAt) - new Date(b.createdAt);
            })
            setFiles(data)
        }

        fetchApi()

    }, []);


    const handleOnChangeSelect = (e) => {
        const val = e.target.value
        const newFiles = [...files]
        switch (val) {
            case 'created-by-ascendent':
                newFiles.sort(function(a,b){
                    return new Date(a.createdAt) - new Date(b.createdAt);
                })
                setFiles(newFiles)
                break;

            case 'filename-by-ascendent':
                newFiles.sort(function(a,b){
                    return a.fileName.localeCompare(b.fileName, undefined, {numeric: true, sensitivity: 'base'});
                })
                setFiles(newFiles)
                break;

            case 'filename-by-descendent':
                newFiles.sort(function(a,b){
                    return b.fileName.localeCompare(a.fileName, undefined, {numeric: true, sensitivity: 'base'});
                })
                setFiles(newFiles)
                break;
        }
    }

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h1 className="text-center file-title">File Sort</h1>
                <div>
                    <select name="sort-file" onChange={handleOnChangeSelect}>
                        <option value="created-by-ascendent">Sort by Created by Ascendent</option>
                        <option value="filename-by-ascendent"> Sort by Filename Ascendent</option>
                        <option value="filename-by-descendent"> Sort by Filename Descendent</option>
                    </select>
                </div>

                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Created At</th>
                            <th>Filename</th>
                        </tr>
                        </thead>

                        <tbody>

                        {files.map((file, index)=>{
                            return (
                                <tr key={index}>
                                <td >
                                    {index}
                                </td>
                                    <td>
                                        {file.createdAt}
                                    </td>
                                    <td>
                                        {file.fileName}
                                    </td>

                                </tr>



                            )
                        })}

                        </tbody>
                    </table>
                </div>


            </div>




        </div>
        </div>
    )
}

export default FileSort