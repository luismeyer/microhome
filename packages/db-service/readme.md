# @microhome/db-service

The DB-Service is a REST interface for interactions with the Database.

The following endpoints are available:

Module:

- dbServiceCreateModule: `/module`
- dbServiceListModules:`/module`
- dbServiceGetModule: `/module/{moduleid}`
- dbServiceDeleteModule: `/module/{moduleid}`

User:

- dbServiceListUsers: `/user/`
- dbServiceCreateUser: `/user/{userid}`
- dbServiceGetUser: `/user/{userid}`
- dbServiceUpdateUser: `/user/{userid}`
- dbServiceDeleteUser: `/user/{userid}`
- dbServiceListUserModules: `/user/{userid}/module`
- dbServiceGetUserModule: `/user/{userid}/module/{moduleid}`
- dbServiceAddUserModule: `/user/{userid}/module/{moduleid}`
- dbServiceRemoveUserModule: `/user/{userid}/module/{moduleid}`
- dbServiceGetUserModuleDevice: `/user/{userid}/module/{moduleid}/devices/{deviceid}/functions`
- dbServiceUpdateUserModuleToken: `/user/{userid}/module/{moduleid}/token`
- dbServiceUpdateUserToken: `/user/token/{edittoken}`

Admin:

- dbServiceAdminLogin: `/admin/`

## Setup

```bash
yarn
```
