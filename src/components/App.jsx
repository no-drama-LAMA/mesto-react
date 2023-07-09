import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { useState } from "react";
function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(element) {
    setSelectedCard(element);
    setImagePopupOpen(true);

  }

  return (
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCard = {handleCardClick}
      />
      <Footer />
      {/*Попап редактирования профиля*/}
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        openState = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="text"
          className="popup__input popup__input_type_name"
          id="change-profile-name"
          required=""
          name="title"
          defaultValue="Жак-Ив Кусто"
          minLength={2}
          maxLength={40}
        />
        <span className="popup__error-text" id="change-profile-name-error" />
        <input
          type="text"
          className="popup__input popup__input_type_about"
          id="change-profile-about"
          required=""
          name="about"
          defaultValue="Исследователь океана"
          minLength={2}
          maxLength={200}
        />
        <span className="popup__error-text" id="change-profile-about-error" />
      </PopupWithForm>
      {/*Попап добавления элемента*/}
      <PopupWithForm
        name="add-element"
        title="Новое место"
        buttonText="Создать"
        openState = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="text"
          className="popup__input popup__input_type_name"
          id="new-element-name"
          required=""
          name="name"
          placeholder="Название"
          minLength={2}
          maxLength={30}
        />
        <span className="popup__error-text" id="new-element-name-error" />
        <input
          type="url"
          className="popup__input popup__input_type_about"
          id="new-element-img"
          required=""
          name="link"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__error-text" id="new-element-img-error" />
      </PopupWithForm>
      {/*Попап удаления карточки*/}
      <PopupWithForm
        name="delete-element"
        title="Вы уверены?"
        buttonText="Да"
      />
      {/*Попап обновления аватара*/}
      <PopupWithForm
        name="change-avatar"
        title="Обновить аватар"
        buttonText="Создать"
        openState = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="url"
          className="popup__input popup__input_type_about"
          id="avatar"
          required=""
          name="avatar"
          placeholder="Ссылка на изображение"
        />
        <span className="popup__error-text" id="avatar-error" />
      </PopupWithForm>

      {/*Попап раскрытия картинки*/}
      <ImagePopup card={selectedCard} openState = {isImagePopupOpen} onClose = {closeAllPopups}/>
    </div>
  );
}

export default App;
