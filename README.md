`%classifieds`
===
A peer-to-peer marketplace app.



## Installation
Also see the [Desk and Glob](https://developers.urbit.org/guides/core/app-school-full-stack/8-desk) tutorial.

### Install the agent
On your Urbit ship, create and mount a desk for `%classifieds`:
```
|merge %classifieds our %garden
|mount %classifieds
```
Go back to Unix and copy the files from the `desk/` folder into the desk of your pier:
```shell
cp -r path_to_this_repo/desk/* path_to_your_urbit_pier/classifieds
```
Back on your ship, commit the files and install the agent:
```
|commit %classifieds
|install our %classifieds
```
### Deploy the frontend
Inside the `ui/` directory of this repo, run
```shell
npm install
npm run build
```

In your browser, navigate to `http://your_ship_url/docket/upload`. In the drop-down menu for `desk`, select `classifieds`. Click `Choose File` and select the `ui/dist/` directory. Finally, click `glob!`.
