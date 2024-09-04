const FORM = document.querySelector('.form');
const BTN_LOGIN = document.querySelector('.btn-login');
const WRAP = document.querySelector('.wrap');
const AUTH_TITLE = document.querySelector('.auth-title');

const authRequest = async ({ email, password }) => {
  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    return await response.json();
  } catch (error) {
    console.log('error: ', error);
  }
};

const showAuthTitle = (data) => {
  if (data.token) {
      FORM.classList.remove('form-active');
      AUTH_TITLE.textContent = 'Вы авторизованы'
      BTN_LOGIN.textContent = 'Logout'
    } else {
      FORM.classList.remove('form-active');
      AUTH_TITLE.textContent = 'Пользователь не найден'
    }
}

const showForm = () => FORM.classList.add('form-active');

const changeBtnLoginText = () => {
  if (BTN_LOGIN.textContent === 'Logout') {
    BTN_LOGIN.textContent = 'Login'
  }
}

const removeAuthTitleText = () => AUTH_TITLE.textContent = '';

// ==============  Обработчики событий ==================
BTN_LOGIN.addEventListener('click', () => {
  showForm();
  changeBtnLoginText();
  removeAuthTitleText();
})

FORM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userInfo = {
    email: FORM.email.value,
    password: FORM.password.value
  };
  const response = await authRequest(userInfo);
  showAuthTitle(response);
  FORM.reset();
})