import './character.css'

export default function Character({ character }) {
    return (
        <div className="character-container flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
            <img src={character.avatar} className='mx-auto block h-10 rounded-full sm:mx-0 sm:shrink-0' />
            <div className="space-y-2 text-center sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-base font-semibold text-white">{character.name}</p>
                    <p className="text-sm font-normal text-gray-500">By {character.creator}</p>
                </div>
            </div>
        </div>
    );
}