
import {NextResponse} from "next/server";
import {promises as fs} from "fs";

export async function GET(req: Request){
    // Read csv file
    const file = await fs.readFile(process.cwd() + '/src/app/api/data/data.csv', 'utf8');

    // Split csv file by readline
    const file_by_line = file.split("\n")
    const result : IDataType[] = []

    // Process csv file by created At and filename
    for (let i = 0; i < file_by_line.length; i++) {
        const splitDataType = file_by_line[i].split(";")
        const dataType : IDataType = {
            createdAt: splitDataType[0],
            fileName: splitDataType[1]
        }

        result.push(dataType)
    }


    // Return Csv file as Json Data
    return NextResponse.json(result);

}

