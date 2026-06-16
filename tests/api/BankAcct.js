import fetch from "node-fetch"
import { expect } from "chai";
import Ajv from "ajv";
import schemaBankAcct from "../../schema/schemaBankAcct.js";

describe("API Test Suite", function(){
    const baseURL = "https://api.iluma.ai"
    const auth = "Basic aWx1bWFfZGV2ZWxvcG1lbnRfRlg0ZjBNNXN4RGdrNXFGeVpuazYwWmVuZ0FmQTlvMzF4M2VjZDI5dmloamM0Vmh5SjhGY2xaaEhqanc6"
    let id

    it("Validasi POST-Bank Account", async function () {
        const  newPost = {
            "bank_account_number": "12345670",
            "bank_code": "BCA",
            "given_name": "FIRA DIYANKA",
            "surname": "FIRA DIYANKA",
            "reference_id": "testing123-456"
        }

        //hit
        const response = await fetch(`${baseURL}/v1.1/identity/bank_account_data_requests`, {
            method: "POST",
            headers: {
                "content-Type" : "application/json",
                "Authorization": auth
            },
            body: JSON.stringify(newPost), 
        })

        const body = await response.json()
        expect(response.status).to.equal(200)

        expect(body.reference_id).to.equal(newPost.reference_id);

        expect(body).to.have.property("id")
        expect(body).to.have.property("bank_account_number");
        expect(body).to.have.property("bank_code");
        expect(body).to.have.property("status");
        expect(body).to.have.property("reference_id");
        expect(body).to.have.property("created");
        expect(body).to.have.property("updated");
        expect(body).to.have.property("result");

        id = body.id; 

        // validasi json schema
        const ajv = new Ajv()
        const compare = ajv.compile(schemaBankAcct)
        const hasil_validasi = compare(body)

        expect(hasil_validasi).to.be.true
    });

    it("Validasi GET-Bank Account", async function () {
        const response = await fetch(`${baseURL}/v1.1/identity/bank_account_data_requests/${id}`, {
            method: "GET",
            headers:{
                "content-Type" : "application/json",
                "Authorization": auth
            }
        }
        )
        
        const body = await response.json();

        expect(response.status).to.equal(200);

        expect(body.id).to.equal(id);
        expect(body).to.have.property("id")
        expect(body).to.have.property("bank_account_number");
        expect(body).to.have.property("bank_code");
        expect(body).to.have.property("status");
        expect(body).to.have.property("reference_id");
        expect(body).to.have.property("created");
        expect(body).to.have.property("updated");
        expect(body).to.have.property("result");

        // validasi json schema
        const ajv = new Ajv()
        const compare = ajv.compile(schemaBankAcct)
        const hasil_validasi = compare(body)

        expect(hasil_validasi).to.be.true
    })
}
);