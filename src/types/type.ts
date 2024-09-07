import { testcase } from "@prisma/client"

export type question = {
    id : number,
    name : string,
    question : string,
    testcases : testcase[]
    codeFrame :  string,
    solution : string,
    difficulty : string
}