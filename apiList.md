# project api

## authRouters
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile /view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignore/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/reject/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- GET /user/feed  - get the profiles of other users on platform
