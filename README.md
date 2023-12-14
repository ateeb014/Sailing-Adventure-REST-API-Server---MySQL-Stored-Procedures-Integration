# Sailing-Adventure-REST-API-Server---MySQL-Stored-Procedures-Integration
Enhances the Sailing Adventure API server by integrating MySQL Stored Procedures, implementing age restrictions, reservation policies, and customized reports. The project aims to enforce new policies and rules using MySQL Stored Procedures for improved server-side data access.

# Overview
After developing the server side for the Sailing Adventure Web application, suppose the management team has requested the incorporation of specific business logic into the server side. This project enhances the Sailing Adventure API server by integrating MySQL Stored Procedures. Furthermore, it implements age restrictions and reservation policies using parametrized queries within Stored Procedures for improved security. Additionally, the project involves the creation of several customized reports. The goal is to implement new policies and rules using MySQL Stored Procedures for all server-side data access.

# Prerequisites
1.	Node.js and npm Installation: Verify that npm is already installed by running the command npm -v on the terminal. If npm is installed, then the version number will be displayed. Otherwise, install npm from the Nodejs.org site.
2.	Project Initialization: Use the following command to initialize the project directory and create the package.json file. Use the -y option to accept the defaults.
•	 npm init -y 
3.	MySQL Driver Installation:Install the MySQL driver using the following command:
•	npm install mysql2

# Rules
1.	Sailors must be at least 24 years old to be added to the database.
Reservation rules:
2.	To reserve a Fishing vessel, the sailor’s rate must be higher than 7.
3.	To reserve a Sailboat, the sailor’s rate must be higher than 5.
4.	Sailors with a rate less than or equal to 2 can only reserve a Bass boat.
   
# Customized Reports
1.	Display the boat ID and name reserved before a given date.
2.	Display the boat ID and name reserved after a given date.
3.	Display boat ID and names of a given type.
4.	Display the count of boats of a given type.
5.	Display all sailors who are older than a given age.
6.	Display all sailors who are younger than a given age.
# Setup and Implementation
1.	MySQL Stored Procedures Integration: Integrated MySQL Stored Procedures to implement new rules.
2.	Used parametrized queries for ALL queries.
3.	Organized .js files: Web application functionalities in '/lib' subfolder, Node.js server code in the main application folder.
4.	Testing and Validation: Validated server responses using Postman.
5.	Developed server code and tested with Postman.
# Test Cases
1.	Enforcement of Business Rules
2.	Customized Reports
# Deliverables
1.	Updated .js file for the Node.js server implementation.
2.	Updated .js files under the '/lib' folder implementing operations for Sailors, Boats, and Reservations.
3.	Text file listing the code for all stored procedures implemented on the MySQL server.
# Snapshots
Sample output snapshots are provided for various scenarios, including inserting a new sailor, inserting new reservations, and displaying boat reservations before/after a given date.
