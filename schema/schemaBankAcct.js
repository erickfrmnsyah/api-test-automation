const schemaBankAcct = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "bank_account_number": {
      "type": "string"
    },
    "bank_code": {
      "type": "string"
    },
    "status": {
      "type": "string"
    },
    "reference_id": {
      "type": "string"
    },
    "created": {
      "type": "string"
    },
    "updated": {
      "type": "string"
    },
    "id": {
      "type": "string"
    },
    "result": {
      "type": "object",
      "properties": {
        "is_found": {
          "type": "boolean"
        },
        "is_virtual_account": {
          "type": "boolean"
        },
        "need_review": {
          "type": "boolean"
        },
        "account_holder_name": {
          "type": "string"
        }
      },
      "required": [
        "is_found",
        "is_virtual_account",
        "need_review",
        "account_holder_name"
      ]
    }
  },
  "required": [
    "bank_account_number",
    "bank_code",
    "status",
    "reference_id",
    "created",
    "updated",
    "id",
    "result"
  ]
}

export default schemaBankAcct;