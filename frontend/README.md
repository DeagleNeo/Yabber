# In the "/frontend" directory, you can run:
## `npm start`
  -- run the frontend programme in the development mode.
     and open "http://localhost:3000" to view it in your browser.

## `npm run build`
  -- build the frontend programme for production to the `build` folder.



# users for test:
1.  accountName: amberheard@microsoft.com
    password: 123abc
2.  accountName: billgates@microsoft.com
    password: 123abc
3.  accountName: cinderella@microsoft.com
    password: 123abc



# .env file for frontend:
PORT=3000
REACT_APP_SERVER_ADD=http://localhost:5000



# file structure for frontend：
- yabber
  - public
    - index.html
  - src
    - api
      - api.js
    - assets
      - login_background.png
      - yabber_logo.png
      - yabber_logos.png
      - Yabber-logos.zip
    - components
    - config
      - breakpoints
        - breakpoints.js
        - index.js
    - pages
      - LoginPage
        - AccountContent
        - components
        - ImagePanel
        - index.js
        - LoginPage.js
      - MainPage
        - components
          - ChannelsMessagesPage
          - Sidebar
        - index.js
        - MainPage.js
      - index.js
      - page.js
    - theme
      - index.js
      - theme.js
    - utils
    - App.js
    - index.js
    - .env
    - .gitignore
    - package-lock.json
    - package.json
    - README.md
