import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LikeContent from "../LikeContent/LikeContent";

function Card({ element, onCard, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser)
  return (
    <article className="element">
      {currentUser._id === element.owner._id && <button className="element__trash" onClick={() => {onCardDelete(element._id)}}/>}
      <img className="element__image" src={element.link} alt={element.name} onClick={() => onCard({name: element.name, link: element.link })}/>
      <div className="element__text">
        <h2 className="element__title" >{element.name}</h2>
        <LikeContent masterId={currentUser._Id} elementId={element._id} likes={element.likes}/>
      </div>
    </article>
  );
}

export default Card;
