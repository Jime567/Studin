# StuDin #
[Live Site](startup.jamesphelps.click)

The current BYU app has a dining feature meant to help students conveniently get food. It features a variety of on-campus restaurants with many different food options. Students can simply order online and pickup their food as soon as they arrive. If it sounds too good to be true, it's because it is. The cost of eating at one of these establishments is astronomically high, especially for a poor college student trying to make money on the side to live while going to school.

StuDin solves the problem by providing on-campus meals for free to all students. Students can simply self-report known events around campus that are giving out free food. Hungry students can check the app to find free food around them and check for future events. StuDin builds community as students help eachother to eat well while corporate chain restaurants just steal money from the community. Choose to support ending world hunger on a campus-wide level.

| StuDin | BYU Dining |
| --- | --- |
| Gives Food | Gives Debt |

![StuDin Flow Diagram](https://drive.google.com/uc?export=download&id=1IEGCuuyei5nlO7TLkkGEmKMp8--Zk1UR)

## Technologies ##
* Authentication: The webapp will require user accounts to access the content and to report food locations
* Database Data: The locations, descriptions, and times for food events will be stored in a database.
* Websocket Data: Live reporting of events will be received and sent by the server

## HTML Deliverable ##
* **HTML Pages:** Pages representing the four main screens created: Login, Now, Map, and Future
* **Links:** Links added to connect all of the pages together in a navigation flow
* **Text:** Text placed as placeholders for future data
* **Images:** Logo Image added and an image as placeholder for the map
* **Login:** Input form created for login
* **Database:** A database will hold entries that appear on the card elements 
* **Websocket:** The 'Now' page will hold realtime entries

## CSS Deliverable ## 
* **Header, Footer, and Main Content Body**
* **Navigation Elements:** Navigation elements are styled after the pattern of the theme
* **Responsive to Window Resizing:** The interface will work on all screen sizes and dynamically change to fit nicely
* **Applicaiton Elements:** The colors work well together and contrast is used appropriately
* **Applicaiton Text Cotnent:** Uniform font used throughout
* **Applicaiton Images:** Images sized and placed appropriately

## JavaScript deliverable
- **Login:**  Logging in takes user to the now page
- **Aatabase:** Username, password, and events are stored
- **WebSocket:** Websockets will deliver events from other users in the future
- **Application Aogic:** The events are deleted automatically 1 hour after their start time. Events that have started and are ongoing appear in the now screen. Events that are not ongoing appear in the future screen. Icons for events on the map greyed out if they are not ongoing.

## Service deliverable

- Made Node.js and Express HTTP service
- **Calls to third party endpoints:** Gets the weathers
- **Backend service endpoints:** Endpoints for getting coords for building locations
- **Frontend calls service endpoints:** The map calls my api to get location information for mapping buildings

## MongoDB Deliverable

- **MongoDB Atlas database created:** done
- **Endpoints for data:** endpoints are used for all interactions with DB
- **Stores data in MongoDB:** Events are stored and retrieved from Mongo

