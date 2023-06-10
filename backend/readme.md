# In the "/backend" directory, you can run:

## `npm run dev`

-- run the backend programme in the development mode.

## `npm start`

--run the backend programme in the production mode.

# .env file for backend：

PORT=5000
MONGODB_CONNECTION_URL=mongodb+srv://yabberdevelopers:Rr3DTLCrqKUvTFd@cluster0.op1hn0q.mongodb.net/yabbertest
DOMAIN=http://www.yabbertech.com/
JWT_KEY=yabbersecret
TOKEN_EXPIRATION_TIME=1d

# file structure for backend：

- yabber
  - backend
    - src
      - controllers
        - channel.controller.js
        - message.controller.js
        - organization.controller.js
        - user.controller.js
      - database
        - mongoDB.js
      - jwt
        - jwt.js
      - middleware
        - auth.js
        - errorHandler.js
      - models
        - channel.js
        - channelActivity.js
        - message.js
        - organization.js
        - user.js
      - routes
        - channel.route.js
        - index.js
        - message.route.js
        - organization.route.js
        - user.route.js
      - services
        - channel.service.js
        - message.service.js
        - organization.service.js
        - user.service.js
      - socketIO
        - socketIO.js
      - utils
        - generateFullName.js
      - app.js
      - index.js
    - .env
    - .gitignore
    - package-lock.json
    - package.json
    - README.md

# apis

health check
path: /healthcheckupcostsmoney
res code: 200

## message-related apis:

1. save a message to db
   path: ${host}/v1/msgs
   method: post
   req.headers: 'authorization' (Bearer Token)
   req.body: { sender, receiver, content, msgType, time }
   return: { data: { msg } }
   if error, return: { error: "error message..." }

2. use search box to search for messages by keywords
   path: ${host}/v1/msgs/search
   method: get
   req.headers: 'authorization' (Bearer Token)
   req.query: { sender, receiver, content, begin_time, end_time }
   return: { data: { msgs } }
   if error, return: { error: "error message..." }

3. get certain number of messages from a channel
   path: ${host}/v1/msgs/:channelId
   this endpoint will return messages created earlier than the one with fmid
   number is the number of messages you wish to return
   if no fmid or number is provided in the query, it will return the LATEST 50 messages
   method: get
   req.headers: 'authorization' (Bearer Token)
   req.params: { channelId }
   req.query: {fmid, number}
   return: { data: { msgs } }

<!-- 3. get all messages of a channel
   path: ${host}/v1/msgs/:channelId
   method: get
   req.headers: 'authorization' (Bearer Token)
   req.params: { channelId }
   return: { data: { msgs } } -->

4. add or remove a reaction of the message
   (add when an user doesn't react the message,remove when the user has reacted it.)
   path: ${host}/v1/msgs/info/:msgId
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.params: { msgId }
   req.body: { userId }
   return: { data: { msg } }
   if error, return: { error: "error message..." }

5. delete a message from db
   path: ${host}/v1/msgs/:msgId
   method: delete
   req.headers: 'authorization' (Bearer Token)
   req.params: { msgId }
   return: no contents
   if error, return: { error: "error message..." }

6. get the list of user names (full name) who make reaction to a certain message
   path: ${host}/v1/msgs/info/reaction,
   method: get,
   req.headers: 'authorization' (Bearer Token)
   req.query: {msgId},
   return: {data:[{_id, firstName, lastName, name,avatar}]}

## user-related apis:

1. register
   path: ${host}/v1/users/register
   method: post
   req.body: { accountName, password, firstName, lastName, timezone }
   return: { data: { user, token } }
   if error, return: { error: "error message..." }

2. login
   path: ${host}/v1/users/login
   method: post
   req.body: { accountName, password }
   return: { data: { user, token } }
   if error, return: { error: "error message..." }

3. get an user's self-info or other user's info
   path: ${host}/v1/users/info/:userId
   method: get
   req.headers: 'authorization' (Bearer Token)
   req.params: { userId }
   return: { data: { user } }
   if error, return: { error: "error message..." }

4. update an user's self-info
   path: ${host}/v1/users/info
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.body: { email, firstName, lastName, avatar, department, jobTitle, activeChannel, timezone, city, country }
   return: { data: { user } }
   if error, return: { error: "error message..." }

5. change password
   path: ${host}/v1/users/password
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.body: { oldPassword, newPassword }
   return: { data: { user } }
   if error, return: { error: "error message..." }

6. use search box to search for users by keywords
   path: ${host}/v1/users/search
   method: get
   req.headers: 'authorization' (Bearer Token)
   req.query: { accountName, email, firstName, lastName, department, jobTitle, city, country }
   return: { data: { users } }
   if error, return: { error: "error message..." }

7. check if the email is available for register
   path: ${host}/v1/users/isemailavailable,
   method: post,
   Authorization: not required,
   req.body:{email}
   return:
   -success: code 200, {available:true}, email is to register;
   -error: code 409, {available:false}, email already exist

8. verify token
   path: ${host}/v1/users/authentication,
   method: get,
   req.headers: 'authorization' (Bearer Token)
   req.body:none
   return:
   -success: code 200, token is valid;
   -error: code 401/403, token is not valid;

9. check invitations
   path: ${host}/v1/users/invitations,
   method: get,
   req.headers: 'authorization' (Bearer Token)
   req.body:none
   return:
   -success: code 200, an object
   {data:
   {
   firstName:"string",
   lastName: "string",
   invitations: [{_id, name, description, avatar}],
   }
   }

10. accept invitation
    path: v1/users/invitation/accept
    method: put,
    req.headers: 'authorization' (Bearer Token)
    req.body:{orgId: organization id}
    return:
    success, code: 200, {data: orgId},
    fail, code: 400

11. decline invitation
    path:v1/users/invitation/decline,
    method: put, (cannot use delete, delete cannot carry req.body)
    req.headers: 'authorization' (Bearer Token)
    req.body:{orgId: organization id}
    return:
    success, code: 200, {data: updatedInvitations},
    fail, code: 400

12. initial mainpage connection, provide user name and organization info
    enpoint: 'v1/users/connectionsummary'
    method: get
    req.headers: 'authorization' (Bearer Token)
    'X-Current-Org' (organization ID)
    return: code 200, {data: user}

<!-- 7. delete user from db
  path: ${host}/v1/users
  method: delete
  req.headers: 'authorization' (Bearer Token)
  return: no contents
  if error, return: { error: "error message..." } -->

10. send invitation to user
    path: ${host}/v1/users/invitation/add
    method: put
    req.headers: 'authorization' (Bearer Token)
    req.body: { accountName }
    return:

    - code 200, { data: { user } }
    - code 404, { error: "invitee not found" }
    - code 409, { error: "invitee already in another organization" }
    - code 409, { error: "invitee already in this organization" }

11. (multiple organization) switch organizations switching users
    path: ${host}/v1/users/switch
    method: post
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.body: { userId }
    return:
    - code 200, { data: { user, token } }
    - code 404, { error: "user not found" }

## organization-related apis:

1. create an organization and save it to db
   path: ${host}/v1/orgs
   method: post
   req.headers: 'authorization' (Bearer Token)
   req.body: { name, description, avatar }
   return: { data: { org } }
   if error, return: { error: "error message..." }

2. get an organization's info
   path: ${host}/v1/orgs/info/:orgId
   method: get
   req.headers: 'authorization' (Bearer Token)
   req.params: { orgId }
   return: { data: { org } }
   if error, return: { error: "error message..." }

3. update an organization's info
   path: ${host}/v1/orgs/info/:orgId
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.params: { orgId }
   req.body: { name, owner, description, avatar }
   return: { data: { org } }
   if error, return: { error: "error message..." }

<!-- 4. delete an organization from db
  path: ${host}/v1/orgs/:id
  method: delete
  req.headers: 'authorization' (Bearer Token)
  req.params: { orgId }
  return: no contents
  if error, return: { error: "error message..." } -->

5. add an user to an organization
   path: ${host}/v1/orgs/:orgId/member/:userId
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.params: { orgId, userId }
   return: { data: { org } }
   if error, return: { error: "error message..." }

<!-- 6. remove an user from an organization
  path: ${host}/v1/orgs/:orgId/member/:userId
  method: delete
  req.headers: 'authorization' (Bearer Token)
  req.params: { orgId, userId }
  return: { data: { org } }
  if error, return: { error: "error message..." } -->

7. set an user as admin
   path: ${host}/v1/orgs/:orgId/admin/:userId
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.params: { orgId, userId }
   return: { data: { org } }
   if error, return: { error: "error message..." }

8. unset an user as admin
   path: ${host}/v1/orgs/:orgId/admin/:userId
   method: delete
   req.headers: 'authorization' (Bearer Token)
   req.params: { orgId, userId }
   return: { data: { org } }
   if error, return: { error: "error message..." }

9. get all the members in the organization
   path: ${host}/v1/orgs/members,
   method: get,
   req.headers: 'authorization' (Bearer Token)
   return: code 200, a list of members with id, names, email;

10. get all the members in the organization except the inquiring user
    path: ${host}/v1/orgs/othermembers,
    method: get,
    req.headers: 'authorization' (Bearer Token)
    return: code 200, a list of members with id, names, email, the list does not include the user who makes the enquiry

11. (multiple organization) create an organization by account
    path: ${host}/v1/orgs/create
    method: post
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.body: { name, description, avatar }
    return:

    - code 201, { data: { org, user, token } }
    - code 404, { error: "account not found" }

12. (multiple organization) join an organization by account
    path: ${host}/v1/orgs/join
    method: post
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.body: { orgId }
    return:
    - code 200, { data: { org } }
    - code 404, { error: "account or organization not found" }
    - code 403, { error: "account did not receive the invitation from the organization" }

## channel-related apis:

1. create a channel to db
   path: ${host}/v1/channels
   method: post
   req.headers: 'authorization' (Bearer Token)
   req.body: { name, isDM, isPrivate, avatar, description, organization }
   return: { data: { channel } }
   if error, return:
   code: 404, content { error: "user not in organization" }
   code: 409, content {error: "Group already existed, please use another group name."}

2. create a channel and handle follow-up service
   path: v1/channels/create
   method: post
   req.headers: 'authorization' (Bearer Token)
   req.body: { name, isDM, isPrivate, avatar, description, organization, membersIdArray }
   return:
   code: 200, { data: { channel } }
   if error, return:
   code: 400, { data: "including invalid members"}
   code: 404, { data: "user not in organization" }
   code: 409, { data: "Group already existed"}

3. create a dm and handle follow-up service
   path:v1/channels/create/dm
   method: post
   req.headers: 'authorization' (Bearer Token)
   req.body: { name, isDM, isPrivate, organization, memberId }
   return:
   code: 200, { data: { channel } }
   if error, return:
   code: 400, { data: "including invalid members"}
   code: 404, { data: "user not in organization" }
   code: 409, { data: "Group already existed"}

<!-- 2. delete a channel from db
  path: ${host}/v1/channels/:id
  method: delete
  req.headers: 'authorization' (Bearer Token)
  req.params: { channelId }
  return: no contents
  if error, return: { error: "error message..." } -->

<!-- 3. add an user to a channel
  path: ${host}/v1/channels/:channelId/member/:userId
  method: put
  req.headers: 'authorization' (Bearer Token)
  req.params: { channelId, userId }
  return: { data: { channel } }
  if error, return: { error: "error message..." } -->

<!-- 3. add multiple users to a channel
   path: ${host}/v1/channels/addmembers
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.body: { channelId, userIdArray }
   return: { data: { channel } }
   if error, return: 404 { error: "error message..." } there will be 3 types of erros -->

4. remove an user from a channel
   path: ${host}/v1/channels/:channelId/member/:userId
   method: delete
   req.headers: 'authorization' (Bearer Token)
   req.params: { channelId, userId }
   return: { data: { channel } }
   if error, return: { error: "error message..." }

5. update a channel's info
   path: ${host}/v1/channels/info/:channelId
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.params: { channelId }
   req.body: { avatar, description, lastMessage }
   return: { data: { channel } }
   if error, return: { error: "error message..." }

6. get a channel's info
   path: ${host}/v1/channels/info/:channelId
   method: get
   req.headers: 'authorization' (Bearer Token)
   req.params: { channelId }
   return: { data: { channel } }
   if error, return: { error: "error message..." }

7. verify channel(group) name
   path: v1/channels/verifygroupname
   method: post
   req.headers: 'authorization' (Bearer Token)
   req.body: {groupName, organizationId}
   return
   if available, code: 200
   if not available, code: 409

8. get channels(groups) summary
   path: v1/channels/channels/summary
   method: get
   req.headers: 'authorization' (Bearer Token)
   'X-Current-Org' (organization ID)
   req.body: none
   return: code 200, {data: [channels]}
   other codes: blocked by token or organization

9. get dm(chat) summary
   path: v1/channels/dms/summary
   method: get
   req.headers: 'authorization' (Bearer Token)
   'X-Current-Org' (organization ID)
   req.body: none
   return: code 200, {data: [channels]}
   other codes: blocked by token or organization

10. discover public channels and all organization users
    path: 'v1/channels/discover'
    method: get
    req.headers: 'authorization' (Bearer Token)
    'X-Current-Org' (organization ID)

Channel Activity:

1. update user's channel activity log
   path: ${host}/v1/channels/updatevisittime
   method: put
   req.headers: 'authorization' (Bearer Token)
   req.body: { channelId, time } //user's last visited channel
   return: code 204 (no content)
   code 404 if userId or channel id is invalid

## (multiple organization) account-related apis:

1.  account register
    path: ${host}/v1/accounts/register
    method: post
    req.headers: none
    req.body: { accountName, password, firstName, lastName }
    return:

    - code 201, { data: { account, accountToken } }
    - code 404, { error: "account name, password and first name are required" }
    - code 404, { error: "account name already existed, please use another one" }

2.  account login
    path: ${host}/v1/accounts/login
    method: post
    req.headers: none
    req.body: { accountName, password }
    return:

    - code 200, { data: { account, accountToken } }
    - code 404, { error: "account name and password are required" }
    - code 401, { error: "invalid email or password" }

3.  get account information
    path: ${host}/v1/accounts/info
    method: get
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.body: none
    return:

    - code 200, { data: { account } }
    - code 404, { error: "account not found" }

4.  update account information
    path: ${host}/v1/accounts/info
    method: put
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.body: { firstName, lastName, city, country, timezone }
    return:

    - code 200, { data: { account } }
    - code 404, { error: "account not found, update failed" }

5.  change account password
    path: ${host}/v1/accounts/password
    method: put
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.body: { oldPassword, newPassword }
    return:

    - code 200, { data: { account } }
    - code 403, { error: "old password or new password is required" }
    - code 403, { error: "invalid password" }

6.  leave organization by removing user from account
    path: ${host}/v1/accounts/remove
    method: delete
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.headers: 'authorization' (Bear Token) --for currentUser
    req.body: { userId }
    return:

    - code 200, { data: { account } }
    - code 404, { error: "currentUser or user not found" }
    - code 403, { error: "currentUser and user are not in the same organization" }

7.  send invitation to account
    path: ${host}/v1/accounts/invitations/add
    method: put
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.headers: 'authorization' (Bear Token) --for currentUser
    req.body: { accountName }
    return:

    - code 200, { data: { account } }
    - code 404, { error: "invitee not found" }
    - code 409, { error: "invitee already in this organization" }

8.  list account invitations
    path: ${host}/v1/accounts/invitations
    method: get
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.body: none
    return:

    - code 200, { data: { account } }

9.  decline account invitation
    path: ${host}/v1/accounts/invitations/decline
    method: put
    req.headers: 'X-Auth-Token' (Bear Token) --for account
    req.body: { orgId }
    return:
    - code 200, { data: { account } }
    - code 404, { error: "account not found" }
