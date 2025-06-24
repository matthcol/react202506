import { useState, useOptimistic } from 'react';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [optimisticLiked, updateOptimisticLiked] = useOptimistic(liked);

  const handleToggleLike = async () => {
    const nextValue = !liked;
    console.log('optimistic like:', nextValue)
    // Optimistic update immédiate côté UI
    updateOptimisticLiked(nextValue);

    try {
      // Simule un appel API (remplace par ton vrai fetch)
      await fakeLikeApi(nextValue);
      setLiked(nextValue);
    } catch (err) {
      console.error('Erreur API, rollback possible si nécessaire', err);
      // Ici tu peux faire : updateOptimisticLiked(liked); pour rollback si besoin
    }
  };

  return (
    <form action={handleToggleLike}>
        <button
        //   onClick={handleToggleLike}
      style={{
        padding: '10px 20px',
        background: optimisticLiked ? 'hotpink' : '#ddd',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {optimisticLiked ? '❤️ Liked' : '🤍 Like'}
    </button>
    </form>
  );
}

// Simule un appel API avec délai
function fakeLikeApi(like) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('True like here: ', like)
      resolve();
    }, 800); // 800ms de latence simulée
  });
}
