function PopupWithForm({ name, title, buttonText, children, openState, onClose, onSubmit, isFormValid=true }) {

  return (
    <section className={`popup popup_type_${name} ${openState && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__container" onClick={((evt) => evt.stopPropagation())}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        <form
          className="popup__form"
          name={`${name}-form`}
          id={`${name}-form`}
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className={`popup__submit-button ${isFormValid ? ' ' : 'popup__submit-button_disabled'}`} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;