<!-- # DevTinder APIs -->



##authRoiuter
    - POST/signup
    - POST/login
    - POST/logout

##profileRouter
    - GET/profile/view
    - PATCH/profile/edit
    - PATCH/profile/password


##connectionRequestRouter
    - post /request/send/intrested/:userId
    - post /request/send/igonored/:userId
    - post /request/review/accepted/:requestId
    - Post /request/review/rejected/:requestId



##userRouter
    - get /user/connections
    - get /user/requests
    - get /user/feed   -> Get you the profile on other    users on platforms.

