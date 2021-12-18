Defined **endpoints** request for this App

 
**Base endpoints TOPICS**

 
  a) [Add Topic](#Add-Topic)
  b) [Get Topics](#Get-Topics)
  c) [Update Topic](#Update-Topic)
  d) [Delete Topic](#Delete-Topic)

 

### Add Topic

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /topics/add-one | PUT   | Add a new Topic |

```javascript

// Request main.domain.com/topics/add-one
{
    "name": "Chemical Bonding",
    "details": "elements and compounds—while biology is the study of living things"
    "subjectId":1
}

// Response Status Code: 200
 {
    "success": true,
 }

```

### Get Topic

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /topics/get-many | GET   | Get topics by fields |

```javascript

// Request main.domain.com/topics/get-many
 

// Response Status Code: 200
{
    "success": true,
    "data": {
        "data": [
            {
                "_id": 1,
                "name": "Chemical Bonding",
                "details": "elements and compounds—while biology is the study of living things",
                "subject": "Chemistry"
            },
           
            {
                "_id": 4,
                "name": "Chemical Bonding 2",
                "details": "its details",
                "subject": "Chemistry"
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


### Update Topic

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /topics/update-one | POST   | Update subject by Id |

```javascript

// Request main.domain.com/topics/update-one
{
     "details": "biology is the study of living things"
}

// Response Status Code: 201
 {
    "success": true,
 }

```


### Delete Topic

| Endpoint                | Method | Description             |
| ----------------------- | ------ | ----------------------- |
| /topics/delete-one | DELETE   | Delete subject by Id |

```javascript

// Request main.domain.com/topics/delete-one/1
 

// Response Status Code: 201
 {
    "success": true,
 }

```