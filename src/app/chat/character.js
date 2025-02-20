import './character.css';

export default function Character({ character }) {
    return (
        <div className="character-container flex flex-row gap-2 p-8 items-center gap-4 py-4">
            <img src={character.avatar} className='mx-auto block h-10 rounded-full mx-0 shrink-0' />
            <div className="space-y-1 text-left">
                <div className="space-y-0.5">
                    <p className="text-base font-semibold text-white">{character.name}</p>
                    <p className="text-sm font-normal text-gray-500">By {character.creator}</p>
                </div>
            </div>
        </div>
    );
}