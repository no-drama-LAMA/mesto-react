function PopupWidthForm({name, title, buttonText, children, openState, onClose}) {
  return (
    <section className={`popup popup_type_${name} ${openState && 'popup_opened'}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть форму"
          onClick={onClose}
        />
        <form
          className="popup__form"
          name="change-profile-form"
          id="change-profile-form"
          noValidate=""
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWidthForm;