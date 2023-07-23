import { useEffect, useState } from "react";
import api from "../../utils/api";

function LikeContent({ masterId, elementId, likes}) {
  const [sumLikes, setSumLikes] = useState(likes.length);
  const [isLiked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(likes.some((element) => masterId === element._id))
  },[likes, masterId])

  function handleLikeClick() {
    if (isLiked) {
      api.deleteLikeCard(elementId)
        .then((res) => {
          setLiked(false)
          setSumLikes(res.likes.length)
        })
    } else {
      api.likeCard(elementId)
        .then((res) => {
          setLiked(true)
          setSumLikes(res.likes.length)
        })
    }
  }

  return (
    <div className="element__like-wrapper">
      <button
        type="button"
        className={`element__button-like ${isLiked && 'element__button-like_active'}`}
        aria-label="Мне нравится"
        onClick={handleLikeClick}
      />
      <p className="element__like-counter">{sumLikes}</p>
    </div>
  )
}

export default LikeContent;