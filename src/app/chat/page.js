import NavBar from './navbar';
import Conversation from './conversation';
import './page.css';

export default function Chat() {
    const character = {
        avatar: "/characters/placeholder1.avif",
        name: "Character",
        creator: "Creator"
    };
    const user = {
        avatar: "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp",
        name: "User",
        creator: "User"
    };

    return (
        <div className="chat-container">
            <NavBar character={character}></NavBar>
            <Conversation character={character} user={user}></Conversation>
        </div >
    );
}