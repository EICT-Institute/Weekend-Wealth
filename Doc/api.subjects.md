Defined **endpoints** request for this App

 
**Base endpoints SUBJECTS**

 
  a) [Add Subject](#Add-Subject)
  b) [Get Subjects](#Get-Subjects)
  c) [Update Subject](#Update-Subject)
  d) [Delete Subject](#Delete-Subject)


 
### Add Subject

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /subjects/add-one | PUT   | Add a new Subject |

```javascript

// Request main.domain.com/subjects/add-one
{
    "name": "Chemestry",
    "details": "Chemistry is the study of substances—that is, elements and compounds—while biology is the study of living things"
}

// Response Status Code: 200
 {
    "success": true,
 }

```

### Get Subjects

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /subjects/get-many | GET   | Get subjects by fields |

```javascript

// Request main.domain.com/subjects/get-many
 

// Response Status Code: 200
{
    "success": true,
    "data": {
        "data": [
            {
                "_id": 1,
                "name": "Chemestry",
                "details": "Chemistry is the study of substances—that is, elements and compounds—while biology is the study of living things"
            },
            {
                "_id": 2,
                "name": "Business Study",
                "details": "Business studies is an academic subject taught in schools and at university level in many countries. Its study combines elements of accountancy, finance, marketing, organizational studies, human resource management, and operations"
            }
        ],
        "pagination": {
            "pageNumber": 1,
            "pageLimit": 50,
            "pageCount": 1,
            "totalCount": 2,
            "sortOrder": 1,
            "sortField": "entryDate"
        }
    }
}

```


### Update Subject

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /subjects/update-one | POST   | Update subject by Id |

```javascript

// Request main.domain.com/subjects/update-one
{
     "details": "Chemistry is the study of substances—that is, elements and compounds—while biology is the study of living things"
}

// Response Status Code: 201
 {
    "success": true,
 }

```


### Delete Subject

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /subjects/delete-one | DELETE   | Delete subject by Id |

```javascript

// Request main.domain.com/subjects/delete-one/1
 

// Response Status Code: 201
 {
    "success": true,
 }

```