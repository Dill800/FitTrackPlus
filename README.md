# FitTrack+

FitTrack+ is a social fitness app developed for iOS machines

## Setup
* Navigate to project directory (.../FitTrackPlus)
* Create a config.js file in ```FitTrackPlus/backend/config``` (you will have to create the config folder)
* Within config.js, copy/paste:
```javascript
module.exports = {
    db: {
      // Database name is embedded into the URI, first directory after domain name
      // Place the URI of your mongo database here:
      uri: [MONGODB_URI]
    },
    ipv4: [IPV4]
}
```
where [MONGODB_URI] is the proper URI strong (provided to you if you are intended to have access to this repository) and [IPV4] is your IPv4 address.

  
To find your IPv4 address:

* If on Windows, run Command Prompt and run the command ```ipconfig```. The IPv4 will be under Wireless LAN adapater Wi-Fi next to ```IPv4 Address```

* If on MacOS, go to System Preferences -> Network. Select Wi-Fi on the left, and the IPv4 will be on the right next to IP address.


<br/>
   


* Install Node (https://nodejs.org/en/)

* Install Yarn (https://classic.yarnpkg.com/en/docs/install#windows-stable)

* Install/Upgrade Yarn (npm install --global yarn)

* Install Expo CLI (npm install --global expo-cli)

* Run expo register and expo login to create/login to account

* Download Expo Go app on phone and log in
* Run ```yarn``` and ```npm i``` to install packages

* Run expo start (or ```expo start --tunnel``` if you're using a WSL terminal)

* Run ```expo start``` and ```npm run server``` from CMD instead of a WSL terminal (WSL uses a different Internet Adapter which assigns a different IP). Make sure to run ```expo start``` and ```npm run server``` in their own CMD terminals.


## Contributors
Dillon McGovern 

Ryan Ahmed

Brock Major

David Wang

Gary Wu

## License
[MIT](https://choosealicense.com/licenses/mit/)
