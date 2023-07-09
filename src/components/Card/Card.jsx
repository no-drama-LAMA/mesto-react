function Card({ element, onCard }) {
  return (
    <article className="element">
      <button className="element__trash" />
      <img className="element__image" src={element.link} alt={element.name} onClick={() => onCard({name: element.name, link: element.link })}/>
      <div className="element__text">
        <h2 className="element__title" >{element.name}</h2>
        <div className="element__like-wrapper">
          <button
            type="button"
            className="element__button-like"
            aria-label="Мне нравится"
          />
          <p className="element__like-counter">0</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
