function ImagePopup({card, openState, onClose}) {
  return (
    <section
    className={`popup popup_open-image ${openState && 'popup_opened'}`}
    aria-label="Раскрытие картинки"
  >
    <div className="popup__container">
      <button
        className="popup__close-button"
        type="button"
        aria-label="Закрыть форму"
        onClick={onClose}
      />
      <img src={card.link} alt={card.name} className="popup__image" />
      <p className="popup__element-text">{card.name}</p>
    </div>
  </section>
  )
}

export default ImagePopup;