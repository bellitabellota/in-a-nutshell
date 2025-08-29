# In A Nutshell - Messenger App

This project is my realization of the [final project of TOP's React section](https://www.theodinproject.com/lessons/react-new-messaging-app) in the Rails path.

For deployment [Koyeb](https://www.koyeb.com/) was used, the PostgreSQL database is run via [Neon](https://neon.com/) and an Redis via [Upstash](https://upstash.com/).

___
 
<strong> Try the app yourself: [--> Visit deployed app](https://back-turtle-in-a-nutshell-4f2b4783.koyeb.app/)</strong>
___
You can connect with me via the Connect Token _9b43a805c1d55d0a1a2e_.

Or open a second window and log in as demo user Peter:

Email: peter@mail.com<br>
Password: _peterpeter_

## Features
 - Log in / out / Account deletion
   - Authentication with Devise gem
 - Home / Chats
   - Overview of all chats with the current user's contacts, sorted by most recent activity
   - The individual chats can be accessed by clicking on them.
 - Contacts
   - Users can view the profiles of others and connect with them by entering the Connect Token (which other users shared with them and can be found under 'My Profile').
   - Upon connecting with another user, a chat is created that can be accessed under 'Chats'.
 - My Profile
   - By default, the email address will be the profile name.
   - The profile can be customized (profile picture, name and info)
   - On this page, users can delete their profile.
 - Chat
   - On larger devices (e.g., desktop) in addition to the messages and text editor a contact list is displayed.
   - Users can send rich text messages which allows them to send images as well.
   - The chat provides real-time functionality via websockets for receiving messages.

- Miscellaneous
  - Image upload is realized via Active storage using [Amazon S3](https://aws.amazon.com/s3) for cloud storage.
  - Sending rich text messages is enabled via ActionText and the Trix Editor.
  - The core features are covered with system tests using RSpec, Capybara and FactoryBots.

## Models and Associations

<img width="1118" height="638" alt="image" src="https://github.com/user-attachments/assets/1989404a-291d-4b10-9111-ccee72d7097b" />

  
## Screenshots
- Login:
   <img width="1424" height="872" alt="image" src="https://github.com/user-attachments/assets/ec230842-0ed3-4935-a3a4-1ad28ac25db3" />


- Home / Chats:

  <img width="1424" height="872" alt="image" src="https://github.com/user-attachments/assets/f44c06b7-a6b4-45a2-962a-539db821ba80" />


- Chat:

  <img width="1424" height="872" alt="image" src="https://github.com/user-attachments/assets/e9f3cfbf-bfa6-4a5a-8d96-5f2039a46a33" />


- Contacts:

  <img width="1424" height="872" alt="image" src="https://github.com/user-attachments/assets/2c6512ff-4f7f-4b15-8c50-d6c11ba549f9" />


- Profile page - displaying the profile:
  
  <img width="1424" height="872" alt="image" src="https://github.com/user-attachments/assets/4e20242b-216e-47eb-b77c-9488a2605294" />

- Profile page - customizing the profile:

  <img width="1424" height="872" alt="image" src="https://github.com/user-attachments/assets/b9359eb2-b3d2-4fb1-9b7a-a8dbc440c2ed" />



- Live demo:
  

https://github.com/user-attachments/assets/2fa2859c-a687-43ae-8bc9-155e58782dcf


## Image Sources
- Default profile piczutr from Vecteezy (https://www.vecteezy.com/vector-art/2534006-social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background )
- Send icon from seekicon (https://seekicon.com/free-icon/send_12)
- Logout icon from SVG REPO (https://www.svgrepo.com/svg/67681/logout)





