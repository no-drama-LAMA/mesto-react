import { useEffect, useState } from "react";
import api from "../../utils/api";
import Card from "../Card/Card";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCard}) {
  
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardSet]) => {
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        cardSet.forEach((element) => element.masterId = userData._id);
        setCards(cardSet);
  })
  .catch((error) => console.error(`Ошибка создания страницы ${error}`))
  }, [])
  
  return (
    <main>
      {/*Профиль*/}
      <section className="profile">
        <div className="profile__main">
          <button className="profile__change-avatar-btn" type="button" onClick={onEditAvatar}>
            <img src={userAvatar} alt="Аватар" className="profile__avatar" />
          </button>
          <div className="profile__text">
            <div className="profile__wrapper">
              <h1 className="profile__profile-name">{userName}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__profile-about">{userDescription}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        />
      </section>
      {/*Галерея*/}
      <section className="elements" aria-label="Галерея">
        {cards.map((data) => {
          return (
          <Card key={data._id} element={data} onCard={onCard}/>
          )
        })}
      </section>
    </main>
  );
}

export default Main;
