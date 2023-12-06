# Express back-end APIs

## User APIs
### 1. create account
**route:**
```
'aws_publicDNS:3000/users/create'
```
#### Request body:

```json
{
    email: String,
    password: String
}
```

### 2. get account
**route:**
```
'aws_publicDNS/users/user'
```
#### Request body:

```json
{
    email: String,
}
```

### 3. update account
**route:**
```
'aws_publicDNS/users/update'
```
#### Request body:

```json
{
    email: String,
    password: String
}
```

### 3. delete account
**route:**
```
'aws_publicDNS/users/delete'
```
#### Request body:

```json
{
    email: String,
}
```
