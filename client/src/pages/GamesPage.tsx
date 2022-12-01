import React from 'react';

const GamesPage = () => {
  return (
    <div className='container'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-20'>
        <GameContainer
          src='https://main--snake-game-sonnyk.netlify.app/'
          description='Use your arrow keys and play!'
          title='Snake game'
        />
        <GameContainer
          src='https://6388bb7789ad370e50828e3c--cards-matching-game.netlify.app/'
          description='Select the number of cards and start testing your memory!'
          title='Cards matching game'
        />
      </div>
    </div>
  );
};

export default GamesPage;

const GameContainer = ({
  src,
  title,
  description,
}: {
  src: string;
  title: string;
  description: string;
}) => {
  return (
    <div className='h-[700px] p-10 text-center'>
      <div className='mb-5'>
        <h3 className='text-3xl font-semibold mb-2'>{title}</h3>
        <p>{description}</p>
      </div>
      <iframe allow='autoplay' className='w-full h-full' title='Cards matching game' src={src} />
    </div>
  );
};
