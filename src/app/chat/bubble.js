import "./bubble.css"

export default function Bubble({ left, avatar, message }) {
    return (
        <div className={`bubble rounded-xl w-fit max-w-[75%] ${left ? "left-bubble" : "right-bubble"}`}>
            <div className={`action-bar ${left ? "left-action-bar" : "right-action-bar"}`}>
                <img src={avatar} className="block h-7 rounded-full" />
            </div>
            <div className="text text-lg">{message.text}</div>
        </div>
    );
}