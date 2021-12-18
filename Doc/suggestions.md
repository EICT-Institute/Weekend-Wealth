Defined **endpoints** request for this App

 
**Base endpoints SUGGESTION**

 
  a) [Add Suggestion](#Add-Suggestion)
  b) [Get Suggestions](#Get-Suggestions)
  c) [Update Suggestion](#Update-Suggestion)
  d) [Delete Suggestion](#Delete-Suggestion)


 
### Add Suggestion

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /suggestions/add-one | PUT   | Add a new Suggestion |

```javascript

// Request main.domain.com/suggestions/add-one
{
    "suggestion":"suggestion, suggestion, suggestion",
    "subTopicId":1
}

// Response Status Code: 200
 {
    "success": true,
 }

```

### Get Suggestions

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /suggestions/get-many | GET   | Get suggestions by fields |

```javascript

// Request main.domain.com/suggestions/get-many
 

// Response Status Code: 200
{
    "success": true,
    "data": {
        "data": [
            {
                "_id": 1,
                "suggestion": "suggestion - suggestion",
                "title": "covalent1"
            }
        ],
        "pagination": {
            "pageNumber": 1,
            "pageLimit": 50,
            "pageCount": 1,
            "totalCount": 1,
            "sortOrder": 1,
            "sortField": "entryDate"
        }
    }
}

```


### Delete Suggestion

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /suggestions/delete-one | DELETE   | Delete suggestion by Id |

```javascript

// Request main.domain.com/suggestions/delete-one/1
 

// Response Status Code: 201
 {
    "success": true,
 }

```