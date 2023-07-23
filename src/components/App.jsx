import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import { useCallback, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState('');

  const setsCloseAllPopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopupOpen(false)
    setIsCardDeletePopupOpen(false)
  }, [])

  const closeByPressEsc = useCallback((evt) => { 
    if (evt.key === 'Escape') { 
      setsCloseAllPopups()
      document.removeEventListener('keydown', closeByPressEsc)
    }; 
  }, [setsCloseAllPopups])

  const closeAllPopups = useCallback(() => {
    setsCloseAllPopups()
    document.removeEventListener('keydown', closeByPressEsc)
  }, [setsCloseAllPopups, closeByPressEsc])

  function setEventListeners() {
    document.addEventListener('keydown', closeByPressEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListeners()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListeners()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListeners()
  }

  function handleCardClick(element) {
    setSelectedCard(element);
    setImagePopupOpen(true);
    setEventListeners()

  }

  function handleCardDelete(elementId) {
    setDeletedCard(elementId)
    setIsCardDeletePopupOpen(true);
    setEventListeners()
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardSet]) => {
        setCurrentUser(userData)
        setCards(cardSet);
  })
  .catch((error) => console.error(`Ошибка создания страницы ${error}`))
  }, [])

  function handleDeleteCard(evt) {
    evt.preventDefault()
    api.deleteCard(deletedCard)
      .then(() => {
        setCards(cards.filter((element) => {
          return element._id !== deletedCard
        }))
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
  }

  function handleUpdateUser(data, reset) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка изменения профиля ${error}`))
  }

  function handleUpdateAvatar(data, reset) {
    api.setAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка обновления аватара ${error}`))
  }

  function handleAddPlaceSubmit(data, reset) {
    api.addNewCard(data)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка добавления карточки ${error}`))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Main 
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCard = {handleCardClick}
        onCardDelete = {handleCardDelete}
        cards = {cards}
      />
      <Footer />
      {/*Попап редактирования профиля*/}
      <EditProfilePopup openState = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser}/>
      {/*Попап добавления элемента*/}
      <AddPlacePopup openState = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit}/>
      {/*Попап удаления карточки*/}
      <PopupWithForm
        name="delete-element"
        title="Вы уверены?"
        buttonText="Да"
        openState = {isCardDeletePopupOpen}
        onClose = {closeAllPopups}
        onSubmit = {handleDeleteCard}
      />
      {/*Попап обновления аватара*/}
      <EditAvatarPopup openState = {isEditAvatarPopupOpen} onClose = {closeAllPopups} onUpdateAvatar = {handleUpdateAvatar}/>

      {/*Попап раскрытия картинки*/}
      <ImagePopup card={selectedCard} openState = {isImagePopupOpen} onClose = {closeAllPopups}/>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
